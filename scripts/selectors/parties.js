import { createSelector } from 'reselect';

const getCurrentParty = state => state.parties.currentParty;
const getPropsParty = (state, props) => state.parties.all[props?.computedMatch?.params?.partyId]
const getPlayer = (state, props) => state.parties?.all[props?.computedMatch?.params?.partyId]?.players?.[props?.computedMatch?.params?.playerId]

function objectDoesNotHaveProperties(obj={}) {
  return Object.keys(obj).length === 0;
}

export const makeHasParty = () => createSelector(
  getCurrentParty,
  getPropsParty,
  (currentParty, propsParty) => {
    if (
      objectDoesNotHaveProperties(currentParty)  &&
      objectDoesNotHaveProperties(propsParty)
      ) {
      return false;
    }

    return true;
  }
);

export const makeHasPlayerId = () => createSelector(
  getCurrentParty,
  getPropsParty,
  getPlayer,
  (currentParty, propsParty, player) => {
    if (
      objectDoesNotHaveProperties(propsParty) &&
      objectDoesNotHaveProperties(player)
      ) {
      return false;
    }

    return true;
  }
);
