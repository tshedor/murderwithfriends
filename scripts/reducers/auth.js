import * as types from '../constants/actionTypes';

const initialState = {
  currentUser: {
    displayName: '',
    email: '',
    phoneNumber: '',
    photoURL: '',
    emailVerified: false,
    uid: ''
  }
};

export default function data(state = initialState, action) {
  switch(action.type) {
    case types.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.user
      }

    case types.RESET:
      return initialState;

    default:
      return state;
  }
};
