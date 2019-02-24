import { firebaseAuth, refPartyPlayers, refPartyCharacters, refPartyRounds, refParty } from 'constants/firebase'
import * as types from 'constants/actionTypes'

import { loadPartyAndNarrative } from '../auth/initializer'

import { setCurrentPartyPlayer } from '../characters'

// Store listeners here so that they can be retrieved and iterated over when unbound
let on_listeners = [];

function generateListeners(partyId, dispatch) {
  return [
    {
      ref: refPartyPlayers(partyId),
      callback: snapshot => dispatch( receivePartyPlayers(snapshot.val() || {}))
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
      callback: snapshot => {
        dispatch( loadPartyAndNarrative(partyId) );
        dispatch( setCurrentParty(snapshot.val() || {}, partyId) )
      }
    }
  ]
}

function receivePartyPlayers(players) {
  return {
    type: types.RECEIVE_PARTY_PLAYERS,
    players
  };
}

function receivePartyCharacters(characters) {
  return {
    type: types.RECEIVE_PARTY_CHARACTERS,
    characters
  };
}

function advanceToRound(roundId) {
  return {
    type: types.ADVANCE_TO_ROUND,
    roundId
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

export default (partyId, playerId=null) => (dispatch, getState) => {
  const { currentPartyUid } = getState().parties;

  if (partyId === currentPartyUid) return;

  on_listeners.forEach(item => item.ref.off(item.eventType || 'value', item.callback));

  on_listeners = generateListeners(partyId, dispatch);

  on_listeners.forEach(item =>
    item.ref.on(item.eventType || 'value', item.callback)
  );
  
  if (playerId) {
    dispatch( setCurrentPartyPlayer(partyId, playerId) );
  }
}
