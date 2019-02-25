import { firebaseAuth, refRoot, refParties, refMyParties, table } from 'constants/firebase'
import * as types from 'constants/actionTypes'

// Store listeners here so that they can be retrieved and iterated over when unbound
let on_listeners = [];

function generateListeners(dispatch) {
  return [
    {
      ref: refMyParties(),
      callback: snapshot => {
        const allParties = snapshot.val() || {};

        Object.keys(allParties).forEach(partyId => {
          return dispatch( loadParty(partyId) );
        });
      }
    }
  ]
}

export const loadParty = partyId => (dispatch, getState) => {
  return refParties(partyId).once('value').then(snap => {
    const party = {
      [partyId]: {
        ...(snap.val() || {}),
        id: partyId
      }
    };

    dispatch( receiveParty( party ) );
  });
}

function receiveParty(party) {
  return {
    type: types.RECEIVE_PARTY,
    party
  };
}

export default () => (dispatch, getState) => {
  on_listeners.forEach(item => item.ref.off(item.eventType || 'value', item.callback));

  on_listeners = generateListeners(dispatch);

  on_listeners.forEach(item =>
    item.ref.on(item.eventType || 'value', item.callback)
  );
}
