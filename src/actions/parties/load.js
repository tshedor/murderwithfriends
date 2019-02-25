import { firebaseAuth, refPartyPlayers, refPartyRounds, refParty } from 'constants/firebase'
import * as types from 'constants/actionTypes'

import { loadParty } from '../auth/initializer'

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
      ref: refParty(partyId),
      callback: snapshot => {
        dispatch( loadParty(partyId) );
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

function setCurrentParty(party, partyId) {
  return {
    type: types.SET_CURRENT_PARTY,
    party,
    partyId
  };
}

export default (partyId, playerId=null) => (dispatch, getState) => {
  const { id } = getState().party;

  if (partyId === id) return;

  on_listeners.forEach(item => item.ref.off(item.eventType || 'value', item.callback));

  on_listeners = generateListeners(partyId, dispatch);

  on_listeners.forEach(item =>
    item.ref.on(item.eventType || 'value', item.callback)
  );

  if (playerId) {
    dispatch( setCurrentPartyPlayer(partyId, playerId) );
  }
}
