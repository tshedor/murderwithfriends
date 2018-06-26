import { refPartyCharacters } from 'constants/firebase'

const updateActorName = (name, characterId) => (dispatch, getState) => {
  const { currentPartyUid } = getState().parties;

  return refPartyCharacters(currentPartyUid, characterId, 'partyPlayerName').set(name)
};

export default updateActorName;
