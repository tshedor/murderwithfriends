import { refPartyRounds, refParties } from 'constants/firebase'
import * as types from 'constants/actionTypes'

const advanceRound = () => (dispatch, getState) => {
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

export default advanceRound;
