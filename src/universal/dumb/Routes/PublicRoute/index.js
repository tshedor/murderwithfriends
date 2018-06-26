import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default ({authed, title, ...res}) => {
  document.title = `${title} | Murder with Friends`;

  if (authed) {
    return <Redirect to="/parties" />
  } else {
    return <Route {...res} />
  }
}
