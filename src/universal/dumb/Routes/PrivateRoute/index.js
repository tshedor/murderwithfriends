import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { firebaseAuth } from 'constants/firebase';

export default ({title, ...res}) => {
  document.title = `${title} | Murder with Friends`;

  const authed = !!firebaseAuth().currentUser?.uid;

  if (authed === false) {
    return <Redirect to="/login" />
  }

  return <Route {...res} />
}
