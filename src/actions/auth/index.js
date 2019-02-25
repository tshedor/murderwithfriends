import * as types from 'constants/actionTypes'
import { firebaseAuth, refRoot, table, refCurrentUser } from 'constants/firebase'

import { updatePassword, onAuthStateChanged } from 'utils/auth'

import initializeAfterUserAuth from './initializer'

/**
 * MARK: Firebase + Redux
 */

export const initializeListeners = () => (dispatch, getState) => {
  // Clear redux when you login/logout
  // TODO - maybe only necessary when you logout
  onAuthStateChanged(user => {
    if (user) {
      dispatch( initializeAfterUserAuth() );
    }
  });
};

/**
 * MARK: Firebase-only
 */

export function handleNewProfileData(data) {
  const current_user = firebaseAuth().currentUser;
  let promise_keeper = [];
  if (data.email !== current_user.email) {
    promise_keeper.push( updateEmail(data.email) );
  }

  delete data.email;

  if (data.password) {
    promise_keeper.push( updatePassword(data.password) );
  }

  delete data.password;

  promise_keeper.push( updateCurrentUserAccount(data) );

  return Promise.all(promise_keeper);
}

export function updateCurrentUserAccount(data) {
  const current_user = firebaseAuth().currentUser;

  return current_user.updateProfile(data).then(() => refCurrentUser(table.USERS.INFO).update(data) );
}

// TODO handle errors - https://firebase.google.com/docs/reference/js/firebase.User#updateEmail
function updateEmail(newEmail) {
  const current_user = firebaseAuth().currentUser;

  return current_user.updateEmail(newEmail);
}

/**
 * MARK: Redux-only
 */

function resetAll() {
  return {
    type: types.RESET
  };
}
