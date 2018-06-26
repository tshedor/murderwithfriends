import * as types from 'constants/actionTypes';

const initialState = {
  previews: {},
  currentNarrative: {
    uid: null
  },
  all: {}
};

function receiveNarrative(state, action) {
  let currentNarrative = {
    uid: state.currentNarrative.uid,
  };

  if (Object.keys(action.narrative).includes(state.currentNarrative.uid)) {
    currentNarrative = {
      uid: state.currentNarrative.uid,
      ...action.narrative[state.currentNarrative.uid]
    }
  } else {
    currentNarrative = state.currentNarrative
  }

  return {
    ...state,
    all: {
      ...state.all,
      ...action.narrative
    },
    currentNarrative
  };
}

export default function data(state = initialState, action) {
  switch(action.type) {
    case types.RECEIVE_NARRATIVE_PREVIEWS:
      return {
        ...state,
        previews: action.previews
      };

    case types.RECEIVE_NARRATIVE:
      return receiveNarrative(state, action)

    case types.SET_CURRENT_PARTY:
      return {
        ...state,
        currentNarrative: {
          uid: action.party.narrativeId,
          ...state.all[ action.party.narrativeId]
        }
      };

    case types.RESET:
      return initialState;

    default:
      return state;
  }
};
