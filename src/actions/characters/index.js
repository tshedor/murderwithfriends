import { refPartyPlayers } from 'constants/firebase'
import * as types from 'constants/actionTypes'

export { default as load } from './load'

export const saveCharacterPrompt = (promptId, answer) => (dispatch, getState) => {
  const { id, playerId } = getState().party;

  return refPartyPlayers(id, playerId, 'promptAnswers', promptId).set(answer)
};

export const updateActorName = (name, playerId) => (dispatch, getState) => {
  const { id } = getState().party;

  return refPartyPlayers(id, playerId, 'displayName').set(name)
};

export function setCurrentPartyPlayer(playerId) {
  return {
    type: types.SET_CURRENT_PARTY_PLAYER,
    playerId
  };
}
