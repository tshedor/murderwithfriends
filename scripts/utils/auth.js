import { firebaseAuth } from '../constants/firebase';

export function register(email, password) {
  return firebaseAuth().createUserWithEmailAndPassword(email, password);
}

export function logout() {
  return firebaseAuth().signOut();
}

export function login(email, password) {
  return firebaseAuth().signInWithEmailAndPassword(email, password);
}

export function resetPassword(email) {
  return firebaseAuth().sendPasswordResetEmail(email);
}

export function confirmPasswordReset(code, password) {
  return firebaseAuth().confirmPasswordReset(code, password);
}

export function updatePassword(newPassword) {
  return firebaseAuth().currentUser.updatePassword(newPassword);
}

export function verifyPasswordResetCode(code) {
  return firebaseAuth().verifyPasswordResetCode(code);
}

export function sendEmailVerification() {
  return firebaseAuth().currentUser.sendEmailVerification();
}

export function checkActionCode(code) {
  return firebaseAuth().checkActionCode(code);
}

export function applyActionCode(code) {
  return firebaseAuth().applyActionCode(code);
}

export function onAuthStateChanged(func) {
  return firebaseAuth().onAuthStateChanged(func);
}

export function deleteUser() {
  return firebaseAuth().currentUser.delete();
}
