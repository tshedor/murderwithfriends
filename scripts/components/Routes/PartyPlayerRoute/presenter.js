import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import PrivateRoute from 'components/Modules/Routes/PrivateRoute'

export default ({isPlayerInParty, title, dispatch, ...props}) => {
  if (isPlayerInParty === true) {
    return <Route title={`${title} | The Party`} {...props} />
  } else {
    return <Redirect to='/parties' />
  }
}
