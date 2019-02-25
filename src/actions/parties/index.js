import { firebaseAuth, refPartyPlayers, refParties, refMyParties } from 'constants/firebase'
import * as types from 'constants/actionTypes'

import { created, updated, removeUndefinedValues } from '../shared'

export { default as load } from './load'

export const createParty = ({ displayName, text, location, time, otherNotes, narrativeId }) => (dispatch, getState) => {
  const party = refParties().push()
  party.set({
    id: party.key,
    narrativeId,
    ...removeUndefinedValues({
      displayName,
      text,
      location,
      time,
      otherNotes
    }),
    currentRound: -1,
    ...created(),
    ...updated(),
  });

  const narrative = getState().narratives.all[narrativeId];

  Object.keys(narrative.characters).forEach(characterId => {
    const newPlayer = refPartyPlayers(party.key).push();
    newPlayer.set({
      id: newPlayer.key,
      characterId
    });
  });

  return refMyParties().update({
    [party.key]: true
  });
};

export const editParty = ({ displayName, text, location, time, otherNotes }) => (dispatch, getState) => {
  const { id } = getState().party;

  return refParties(id).update({
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

const changeRound = (shouldIncrement) => () => (dispatch, getState) => {
  const { round, id } = getState().party;
  const { totalRounds } = getState().party.narrative;
  let roundId = round;

  if (round !== totalRounds && shouldIncrement) {
    roundId = round + 1;
  }

  if (round > -1 && !shouldIncrement) {
    roundId = round - 1;
  }

  return refParties(id).update({
    currentRound: roundId
  });
};

export const nextRound = changeRound(true);
export const previousRound = changeRound(false);
