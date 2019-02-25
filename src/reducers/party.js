import * as types from 'constants/actionTypes';
import narratives from 'constants/narratives/_buildNarratives';

import { firebaseAuth } from 'constants/firebase'

const initialState = {
  characters: {},
  characterId: null,
  current: {},
  id: null,
  isOwner: false,
  narrative: {},
  playerId: null,
  players: {},
  rounds: {},
  round: -1,
};

export default function data(state = initialState, action) {
  switch(action.type) {
    case types.SET_CURRENT_PARTY:
      return {
        ...state,
        current: action.party,
        id: action.partyId,
        narrative: narratives.all[action.party.narrativeId],
        characters: narratives.all[action.party.narrativeId].characters,
        isOwner: action.party.createdBy === firebaseAuth().currentUser?.uid,
        round: action.party.currentRound
      };

    case types.SET_CURRENT_PARTY_PLAYER:
      return {
        ...state,
        playerId: action.playerId,
        characterId: state.players?.[ action.playerId ]?.characterId
      };

    case types.RECEIVE_PARTY_PLAYERS:
      return {
        ...state,
        players: action.players,
        characterId: action.players?.[ state.playerId ]?.characterId,
      };

    case types.ADVANCE_TO_ROUND:
      return {
        ...state,
        round: action.roundId
      };

    case types.RESET:
      return initialState;

    default:
      return state;
  }
};
