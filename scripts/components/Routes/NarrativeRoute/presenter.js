import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import PrivateRoute from 'components/Modules/Routes/PrivateRoute';
import Loading from 'components/Modules/Routes/Loading';

export default ({hasNarrative, narrativesAreLoading, creatingNarrative, authed, title, ...props}) => {
  if (!authed) {
    return <Redirect to="/" />
  }

  if (hasNarrative === true) {
    return <PrivateRoute title={`${title} | My Narrative`} authed={authed} {...props} />
  } else {
    if (creatingNarrative) {
      return <Loading title={`Creating ${creatingNarrative}...`} />
    }

    if (narrativesAreLoading) {
      return <Loading />
    } else {
      return <Redirect to='/my-narratives' />
    }
  }
}
