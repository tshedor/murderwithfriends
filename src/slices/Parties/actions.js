import { firebaseAuth, refNarratives, refParties, refPartyRounds, refParty } from 'constants/firebase'
import * as types from 'constants/actionTypes'

const loadPartyAndNarrative = partyId => (dispatch, getState) => {
  return refParties(partyId).once('value').then(snap => {
    const party = { [partyId]: snap.val() || {} };

    dispatch( receiveParty( party ) );

    refNarratives(party[partyId].narrativeId).once('value').then(narrativeSnap => {
      const narrative = { [narrativeSnap.key]: narrativeSnap.val() || {} };

      dispatch( receiveNarrative(narrative) );
    });
  });
};

// Store listeners here so that they can be retrieved and iterated over when unbound
let on_listeners = [];

function generateListeners(partyId, dispatch) {
  return [
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
      callback: snapshot => {
        dispatch( loadPartyAndNarrative(partyId) );
        dispatch( setCurrentParty(snapshot.val() || {}, partyId) )
      }
    }
  ];
}

function advanceToRound(roundId) {
  return {
    type: types.ADVANCE_TO_ROUND,
    roundId
  };
}

function receiveParty(party) {
  return {
    type: types.RECEIVE_PARTY,
    party
  };
}

function receivePartyRounds(rounds) {
  return {
    type: types.RECEIVE_PARTY_ROUNDS,
    rounds
  };
}

function setCurrentParty(party, partyId) {
  return {
    type: types.SET_CURRENT_PARTY,
    party,
    partyId
  };
}

function receiveNarrative(narrative) {
  return {
    type: types.RECEIVE_NARRATIVE,
    narrative
  };
}

export const onMount = ({ partyId }) => (dispatch, getState) => {
  const { currentPartyUid } = getState().parties;

  if (partyId === currentPartyUid) return;

  on_listeners.forEach(item => item.ref.off(item.eventType || 'value', item.callback));

  on_listeners = generateListeners(partyId, dispatch);

  on_listeners.forEach(item => item.ref.on(item.eventType || 'value', item.callback));
};

export const onUnmount = () => (dispatch) => {
  on_listeners.forEach(item => item.ref.off(item.eventType || 'value', item.callback));
};
