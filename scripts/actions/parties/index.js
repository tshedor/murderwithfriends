import { firebaseAuth, refPartyMembers, refParties, refPartyCharacters, refPartyRounds } from 'constants/firebase'
import * as types from 'constants/actionTypes'

import { created, updated, removeUndefinedValues } from '../shared'

export const createParty ({ displayName, text, location, time, otherNotes, narrativeId }) => (dispatch, getState) => {
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
      const newMember = refPartyMembers(party.key).push();
      newMember.set(characterKey);

      refPartyCharacters(party.key, characterKey).update({
        partyMemberId: newMember.key
      });
    });
  });

  return refMyParties().update({
    [party.key]: true
  });
};

export const advanceRound = () => (dispatch, getState) => {
  const currentRound = getState().parties.currentRound;
  const currentPartyUid = getState().parties.currentPartyUid;
  const nextRound = currentRound + 1;

  return refPartyRounds(currentPartyUid, nextRound).update({ ...updated() });
};
