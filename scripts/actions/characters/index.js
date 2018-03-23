import { refPartyCharacters } from 'constants/firebase'
import * as types from 'constants/actionTypes'

export { default as load } from './load'

export const saveCharacterPrompt = (promptId, answer) => (dispatch, getState) => {
  const { currentPartyUid, currentCharacterUid } = getState().parties;

  return refPartyCharacters(currentPartyUid, currentCharacterUid, 'promptAnswers', promptId).set(answer)
};

export function setCurrentPartyPlayer(partyId, playerId) {
  return {
    type: types.SET_CURRENT_PARTY_PLAYER,
    partyId,
    playerId
  };
}
