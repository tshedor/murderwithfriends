import * as types from 'constants/action_types'

const initial_state = {
  notice: {
    msg: null,
    severity: null, // inactive success error attention delete
    duration: null // pass -1 to disable auto hide of notice
  }
};

export default function data(state = initial_state, action) {
  switch(action.type) {
    case types.SET_NOTICE:
      return {
        ...state,
        notice: { ...action }
      };

    case types.CLEAR_NOTICE:
      return {
        ...state,
        notice: initial_state.notice
      };

    case types.RESET_NARRATIVE:
      return {
        ...state,
        notice: state.notice
      };

    case types.RESET:
      return initial_state;

    default:
      return state;
  }
}
