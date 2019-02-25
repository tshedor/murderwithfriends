import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { firebaseAuth } from 'constants/firebase'

const makeRoute = (redirectPath, shouldBeAuthed) => ({title, data, ...res}) => {
  document.title = `${title} | Murder with Friends`;

  const authed = !!firebaseAuth().currentUser?.uid;

  if (authed === shouldBeAuthed) {
    return <Redirect to={redirectPath} />
  }

  return <Route {...res} />
}

export const PrivateRoute = makeRoute('/login', false);
export const PublicRoute = makeRoute('/parties', true);
