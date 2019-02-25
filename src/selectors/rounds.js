import { createSelector } from 'reselect';

const getCurrentRound = state => state.party.round;
const getTotalRounds = state => state.party.narrative.totalRounds;
const getNarrativeRounds = state => state.party.narrative.rounds;
const getCurrentCharacterUid = state => state.party.characterId;

const determineAvailableRounds = createSelector(
  getCurrentRound,
  getTotalRounds,
  (currentRound, totalRounds = -1) => {
    return [ ...Array(totalRounds + 1).keys() ].filter(i => i <= currentRound);
  }
);

function keyedRounds(availableRounds=[], rounds={}) {
  let val = {};

  availableRounds.forEach(roundId => {
    val[roundId] = rounds[roundId]
  });

  return val;
}

export const availableNarrativeRounds = createSelector(
  determineAvailableRounds,
  getNarrativeRounds,
  getCurrentCharacterUid,
  (availableRounds, narrativeRounds, currentCharacterUid) => {
    if (currentCharacterUid) {
      let val = {};

      availableRounds.forEach(roundId => {
        val[roundId] = {
          roundText: narrativeRounds?.[roundId]?.text,
          ...narrativeRounds?.[roundId]?.characters[currentCharacterUid]
        };
      });

      return val;
    }

    return keyedRounds(availableRounds, narrativeRounds);
  }
);
