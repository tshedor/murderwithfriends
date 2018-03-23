import * as types from 'constants/actionTypes';

const initialState = {
  previews: {},
  currentNarrative: {},
  all: {}
};

export default function data(state = initialState, action) {
  switch(action.type) {
    case types.RECEIVE_NARRATIVE_PREVIEWS:
      return {
        ...state,
        previews: action.previews
      };

    case types.RECEIVE_NARRATIVE:
      return {
        ...state,
        all: {
          ...state.all,
          ...action.narrative
        }
      };

    case types.SET_CURRENT_PARTY:
      return {
        ...state,
        currentNarrative: {
          uid: action.party.narrativeId,
          ...state.all[action.party.narrativeId]
        }
      };

    case types.RESET:
      return initialState;

    default:
      return state;
  }
};
