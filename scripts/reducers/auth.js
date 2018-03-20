import * as types from '../constants/action_types';

const initial_state = {
  currentUser: {
    displayName: '',
    email: '',
    phoneNumber: '',
    photoURL: '',
    emailVerified: false,
    uid: ''
  }
};

export default function data(state = initial_state, action) {
  switch(action.type) {
    case types.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.user
      }

    case types.RESET_NARRATIVE:
      return initial_state;

    default:
      return state;
  }
};
