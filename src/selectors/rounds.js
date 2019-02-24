import { createSelector } from 'reselect';

const getCurrentRound = state => state.parties.currentRound;
const getTotalRounds = state => state.narratives.currentNarrative.roundCount;
const getNarrativeRounds = state => state.narratives.currentNarrative.rounds;
const getPartyRoudns = state => state.parties.rounds;
const getCurrentCharacterUid = state => state.parties.currentCharacterUid;

const determineAvailableRounds = createSelector(
  getCurrentRound,
  getTotalRounds,
  (currentRound, totalRounds=4) => {
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
      let val = {}

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
