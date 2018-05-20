import * as types from 'constants/actionTypes';

const initialState = {
  all: {},
  currentParty: {},
  currentPartyUid: null,
  currentCharacterUid: null,
  currentPlayerUid: null,
  players: {},
  characters: {},
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

    case types.SET_CURRENT_PARTY:
      return {
        ...state,
        currentParty: action.party,
        currentPartyUid: action.partyId,
      };

    case types.SET_CURRENT_PARTY_PLAYER:
      return {
        ...state,
        currentPlayerUid: action.playerId,
        currentCharacterUid: state.currentParty?.players?.[ action.playerId ] || state.all[ action.partyId ]?.players[ action.playerId ] 
      };

    case types.RECEIVE_PARTY_PLAYERS:
      return {
        ...state,
        players: action.players
      };

    case types.RECEIVE_PARTY_CHARACTERS:
      return {
        ...state,
        characters: action.characters
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

    case types.RESET:
      return initialState;

    default:
      return state;
  }
};
