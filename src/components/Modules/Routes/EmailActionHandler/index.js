import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { SetNewPassword, ValidateEmail } from 'components/Auth';

import queryString from 'query-string';

export default () => {
  const { mode, oobCode, continueUrl } = queryString.parse(window.location.search);

  return (
    <Route
      render={props => {
        const route_props = { oobCode, continueUrl };

        switch (mode) {
          case 'resetPassword':
            return <SetNewPassword {...route_props} />

          case 'recoverEmail':
            return <ValidateEmail {...route_props} recover={true} />

          case 'verifyEmail':
            return <ValidateEmail {...route_props} />

          default:
            return <Redirect to={{pathname: '/login', state: { from: props.location }}} />
        }
      }}
    />
  );
}
