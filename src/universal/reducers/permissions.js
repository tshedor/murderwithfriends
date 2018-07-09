import * as types from 'constants/actionTypes';

import { firebaseAuth } from 'constants/firebase';

const initialState = {
  isOwner: false
};

export default function data(state = initialState, action) {
  switch(action.type) {
    case types.SET_CURRENT_PARTY:
      return {
        ...state,
        isOwner: action.party.createdBy === firebaseAuth().currentUser?.uid
      };

    case types.RESET:
      return initialState;

    default:
      return state;
  }
};
