import * as universal from 'constants/actionTypes'
import * as types from './actionTypes'

const initialState = {
  currentCharacterUid: null,
  currentPlayerUid: null,
  players: {},
  characters: {}
};

export default function data(state = initialState, action) {
  switch(action.type) {
    case types.SET_CURRENT_PARTY_PLAYER:
      return {
        ...state,
        currentPlayerUid: action.playerId,
        currentCharacterUid: action.characterId
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

    case universal.RESET:
      return initialState;

    default:
      return state;
  }
};
