import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { VerifyEmail } from 'components/Auth';

export default ({component, authed, verified, title, ...res}) => {
  document.title = `${title} | Murder with Friends`;

  if (authed === false) {
    return <Redirect to="/login" />
  }

  if (verified === false) {
    return <VerifyEmail />
  }

  return <Route component={component} {...res} />
}
