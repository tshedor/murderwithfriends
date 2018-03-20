import firebase from 'firebase'

const prod_config = {
  apiKey: "AIzaSyCd05WGHPztDcG40aTDa917U-sHR9K3sNc",
  authDomain: "murder-with-friends.firebaseapp.com",
  databaseURL: "https://murder-with-friends.firebaseio.com",
  projectId: "murder-with-friends",
  storageBucket: "murder-with-friends.appspot.com",
  messagingSenderId: "895584764565"
};

const config = NODE_ENV === 'production' ? prod_config : prod_config;

firebase.initializeApp(config);

const ref = firebase.database().ref();
export const database = firebase.database;
export const firebaseAuth = firebase.auth;

export const refCurrentUser = (...args) => {
  const current_user_id = firebaseAuth().currentUser.uid;
  args.unshift(table.USERS.BASE, current_user_id);
  return refRoot(...args);
};

export const refRoot = (...args) => {
  return ref.child( args.join('/') );
};

export const table = {
  USERS: {
    BASE: 'users',
    INFO: 'info'
  }
};

// Firebase doesn't accept certain characters as keys
// This is duplicated in functions/index
function cleanKey(str) {
  return str
    .replace(/\//g, '')
    .replace(/\./g, ',')
    .replace(/\$/g, '€')
    .replace(/\[/g, '£')
    .replace(/\]/g, '¢')
    .replace(/#/g, '¥');
}

function parseKey(str) {
  return str
    .replace(/,/g, '.')
    .replace(/€/g, '$')
    .replace(/£/g, '[')
    .replace(/¢/g, ']')
    .replace(/¥/g, '#');
}
