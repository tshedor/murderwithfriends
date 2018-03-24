import { firebaseAuth, refPartyPlayers, refParties, refPartyCharacters, refPartyRounds, refNarratives, refMyParties } from 'constants/firebase'
import * as types from 'constants/actionTypes'

import { created, updated, removeUndefinedValues } from '../shared'

export { default as load } from './load'

export const createParty = ({ displayName, text, location, time, otherNotes, narrativeId }) => (dispatch, getState) => {
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

export const editParty = ({ displayName, text, location, time, otherNotes }) => (dispatch, getState) => {
  const { currentPartyUid } = getState().parties;

  return refParties(currentPartyUid).update({
    ...removeUndefinedValues({
      displayName,
      text,
      location,
      time,
      otherNotes
    }),
    ...updated()
  });
};

export const advanceRound = () => (dispatch, getState) => {
  const { currentPartyUid } = getState().parties;

  return refPartyRounds(currentPartyUid).transaction(currentData => {
    const newRound = { ...created(), ...updated() };

    if (currentData) {
      const lastRound = Object.keys(currentData).sort((a, b) => a -b).pop();
      currentData[parseInt(lastRound, 10) + 1] = newRound;
    } else {
      currentData = [ newRound ];
    }

    return currentData;
  });
};
