import { firebaseAuth, refRoot, refParties, refMyParties, table, refNarratives } from 'constants/firebase'
import * as types from 'constants/actionTypes'

// Store listeners here so that they can be retrieved and iterated over when unbound
let on_listeners = [];

function generateListeners(dispatch) {
  return [
    {
      ref: refRoot(table.NARRATIVE_PREVIEWS),
      callback: snapshot => dispatch(receiveNarrativePreviews(snapshot.val() || {}))
    },
    {
      ref: refMyParties(),
      callback: snapshot => {
        const allParties = snapshot.val() || {};

        Object.keys(allParties).forEach(partyId => {
          return refParties(partyId).once('value').then(snap => {
            const party = { [partyId]: snap.val() || {} };

            dispatch( receiveParty( party ) );

            refNarratives(party.narrativeId).once('value').then(narrativeSnap => {
              const narrative = { [narrativeSnap.key]: narrativeSnap.val() || {} };

              dispatch( receiveNarrative(narrative) );
            });
          });
        });
      }
    }
  ]
}

function receiveNarrativePreviews(previews) {
  return {
    type: types.RECEIVE_NARRATIVE_PREVIEWS,
    previews
  };
}

function receiveNarrative(narrative) {
  return {
    type: types.RECEIVE_NARRATIVE,
    narrative
  };
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
