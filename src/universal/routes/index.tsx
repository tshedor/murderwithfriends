import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo';

import LOGGED_IN_USER_QUERY from './remote.graphql'

const makeGraphqlComponent = (component) => graphql(LOGGED_IN_USER_QUERY, {
  options: { fetchPolicy: 'network-only' }
})(component);

const makeRoute = (redirectPath, shouldBeAuthed) => ({title, data, ...res}) => {
  document.title = `${title} | Murder with Friends`;

  // TODO reimplement optional chaining operator
  const authed = data.loggedInUser && data.loggedInUser.id;

  if (authed === shouldBeAuthed) {
    return <Redirect to={redirectPath} />
  }

  return <Route {...res} />
}

const Private = makeRoute('/login', false);
const Public = makeRoute('/parties', true);

export const PrivateRoute = makeGraphqlComponent(Private);
export const PublicRoute = makeGraphqlComponent(Public);
export { default as Unauthorized } from './Unauthorized';
