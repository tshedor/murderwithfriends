import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { VerifyEmail } from 'components/Auth'

export default ({component, authed, title, ...res}) => {
  document.title = `${title} | Murder with Friends`;

  if (authed) {
    return <Redirect to="/parties" />
  } else {
    return <Route component={component} {...props} />
  }
}
