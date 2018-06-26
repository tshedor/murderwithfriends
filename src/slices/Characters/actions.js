import { refPartyPlayers, refPartyCharacters } from 'constants/firebase'
import * as types from './actionTypes'
import makeOnOffFetchListener from '+root/universal/factories/onOffFetchListener'

function generateListeners(dispatch, { partyId, playerId }) {
  return [
    {
      ref: refPartyPlayers(partyId),
      callback: snapshot => {
        const val = snapshot.val() || {};

        dispatch( receivePartyPlayers(val) );

        if (playerId) {
          dispatch( setCurrentPartyPlayer(playerId, val?.[playerId]) )
        }
      }
    },
    {
      ref: refPartyCharacters(partyId),
      callback: snapshot => dispatch( receivePartyCharacters(snapshot.val() || {}))
    },
  ]
}

export const { onMount, onUnmount } = makeOnOffFetchListener(generateListeners);

function setCurrentPartyPlayer(playerId, characterId) {
  return {
    type: types.SET_CURRENT_PARTY_PLAYER,
    playerId,
    characterId
  };
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
