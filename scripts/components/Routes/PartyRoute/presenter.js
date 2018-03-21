import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import PrivateRoute from 'components/Modules/Routes/PrivateRoute'
import Loading from 'components/Modules/Routes/Loading'

export default ({hasParty, title, dispatch, ...props}) => {
  if (hasParty === true) {
    return <Route title={`${title} | The Party`} {...props} />
  } else {
    return <Redirect to='/parties' />
  }
}
