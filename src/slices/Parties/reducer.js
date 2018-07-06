import * as types from './actionTypes';
import * as universal from 'constants/actionTypes';

const initialState = {
  all: {},
  currentParty: {},
  currentPartyUid: null,
  rounds: {},
  currentRound: -1
};

export default function data(state = initialState, action) {
  switch(action.type) {
    case types.RECEIVE_PARTY:
      return {
        ...state,
        all: {
          ...state.all,
          ...action.party
        }
      };

    case universal.SET_CURRENT_PARTY:
      return {
        ...state,
        currentParty: action.party,
        currentPartyUid: action.partyId
      };

    case types.RECEIVE_PARTY_ROUNDS:
      return {
        ...state,
        rounds: action.rounds
      };

    case types.ADVANCE_TO_ROUND:
      return {
        ...state,
        currentRound: action.roundId
      };

    case universal.RESET:
      return initialState;

    default:
      return state;
  }
};
