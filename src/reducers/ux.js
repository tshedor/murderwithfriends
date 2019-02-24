import * as types from 'constants/actionTypes'

const initialState = {
  notice: {
    msg: null,
    severity: null, // inactive success error attention delete
    duration: null // pass -1 to disable auto hide of notice
  }
};

export default function data(state = initialState, action) {
  switch(action.type) {
    case types.SET_NOTICE:
      return {
        ...state,
        notice: { ...action }
      };

    case types.CLEAR_NOTICE:
      return {
        ...state,
        notice: initialState.notice
      };

    case types.RESET_PARTY:
      return {
        ...state,
        notice: state.notice
      };

    case types.RESET:
      return initialState;

    default:
      return state;
  }
}
