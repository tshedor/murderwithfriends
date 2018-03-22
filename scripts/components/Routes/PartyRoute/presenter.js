import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import PrivateRoute from 'components/Modules/Routes/PrivateRoute'
import Loading from 'components/Modules/Routes/Loading'

export default ({hasParty, title, component, dispatch, ...props}) => {
  if (hasParty === true) {
    document.title = `${title} | Murder with Friends`;

    return <component {...props} />
  } else {
    return <Redirect to='/parties' />
  }
}
