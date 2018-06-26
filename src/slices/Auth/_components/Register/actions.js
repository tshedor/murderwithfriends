import { firebaseAuth, refCurrentUser } from 'constants/firebase'

export function updateCurrentUserAccount(data) {
  const current_user = firebaseAuth().currentUser;

  return current_user.updateProfile(data).then(() => refCurrentUser(table.USERS.INFO).update(data) );
}
