import { firebaseAuth, refPartyMembers, refParties, refPartyCharacters, refPartyRounds } from 'constants/firebase'
import * as types from 'constants/actionTypes'

// Store listeners here so that they can be retrieved and iterated over when unbound
let on_listeners = [];

function generateListeners(partyId, dispatch) {
  return [
    {
      ref: refPartyMembers(partyId),
      callback: snapshot => dispatch( receivePartyMembers(snapshot.val() || {}))
    },
    {
      ref: refPartyCharacters(partyId),
      callback: snapshot => dispatch( receivePartyCharacters(snapshot.val() || {}))
    },
    {
      ref: refPartyRounds(partyId),
      callback: snapshot => {
        const data = snapshot.val() || {};
        const rounds = Object.keys(data).sort((a, b) => a - b);
        const latestRound = rounds.pop();

        dispatch( advanceToRound(latestRound) );
        dispatch( receivePartyRounds(data) );
      }
    },
    {
      ref: refParty(partyId),
      callback: snapshot => dispatch( setCurrentParty(snapshot.val() || {}, partyId) )
    }
  ]
}

export default partyId => (dispatch, getState) => {
  const { currentPartyUid } = getState().parties;

  if (partyId === currentPartyUid) return;

  on_listeners.forEach(item => item.ref.off(item.eventType || 'value', item.callback));

  on_listeners = generateListeners(partyId, dispatch);

  on_listeners.forEach(item =>
    item.ref.on(item.eventType || 'value', item.callback)
  );
}

