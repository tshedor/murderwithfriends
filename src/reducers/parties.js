import * as types from 'constants/actionTypes';

const initialState = {
  all: {},
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

    case types.RESET:
      return initialState;

    default:
      return state;
  }
};
