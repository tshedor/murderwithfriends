import { firebaseAuth, refMyParties, refNarratives, refPartyCharacters, refPartyPlayers, refParties } from 'constants/firebase';
import { removeUndefinedValues, created, updated } from 'actions/shared'

const createParty = ({ displayName, text, location, time, otherNotes, narrativeId }) => (dispatch, getState) => {
  const party = refParties().push()
  party.set({
    narrativeId,
    ...removeUndefinedValues({
      displayName,
      text,
      location,
      time,
      otherNotes
    }),
    ...created(),
    ...updated(),
    partyMaster: firebaseAuth().currentUser.uid
  });

  refNarratives(narrativeId).once('value').then(snap => {
    const data = snap.val();

    Object.keys(data.characters).forEach(characterKey => {
      const newPlayer = refPartyPlayers(party.key).push();
      newPlayer.set(characterKey);

      refPartyCharacters(party.key, characterKey).update({
        partyPlayerId: newPlayer.key
      });
    });
  });

  return refMyParties().update({
    [party.key]: true
  });
};

export default createParty;
