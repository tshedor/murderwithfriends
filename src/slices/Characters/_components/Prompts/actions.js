import { refPartyCharacters } from 'constants/firebase'

const saveCharacterPrompt = (promptId, answer) => (dispatch, getState) => {
  const { currentPartyUid } = getState().parties;
  const { currentCharacterUid } = getState().members;

  return refPartyCharacters(currentPartyUid, currentCharacterUid, 'promptAnswers', promptId).set(answer)
};

export default saveCharacterPrompt;
