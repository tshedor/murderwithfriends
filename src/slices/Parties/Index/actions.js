import { refParties, refMyParties } from 'constants/firebase'
import * as types from '../actionTypes'
import makeOnOffFetchListener from '+root/universal/factories/onOffFetchListener'

function generateListeners(dispatch) {
  return [
    {
      ref: refMyParties(),
      callback: snapshot => {
        const allParties = snapshot.val() || {};

        Object.keys(allParties).forEach(partyId => {
          refParties(partyId).once('value', snap => {
            const { displayName } = snap.val() || {};

            dispatch( receiveParty(partyId, displayName) );
          });
        });
      }
    }
  ]
}

function receiveParty(partyId, displayName) {
  return {
    type: types.RECEIVE_PARTY,
    party: {
      [partyId]: {
        uid: partyId,
        displayName
      }
    }
  }
}

export const { onMount, onUnmount } = makeOnOffFetchListener(generateListeners);
