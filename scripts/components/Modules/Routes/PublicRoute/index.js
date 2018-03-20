import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { VerifyEmail } from 'components/Auth';

export default ({component: Component, authed, title, ...res}) {
  document.title = `${title} | Murder with Friends`;
  analytics.page();

  return (
    <Route
      {...res}
      render={props => authed === false
        ? <Component {...props} />
        : <Redirect to='/my-narratives' />}
    />
  )
}
