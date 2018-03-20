import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { VerifyEmail } from 'components/Auth';

export default ({component: Component, authed, verified, title, ...res}) => {
  document.title = `${title} | Murder with Friends`;
  analytics.page();

  return (
    <Route
      {...res}
      render={props => {
        if (authed === false) {
          return <Redirect to={{pathname: '/login', state: {from: props.location}}} />
        }

        if (verified === false) {
          return <VerifyEmail />
        }

        return <Component {...props} />
      }}
    />
  );
}
