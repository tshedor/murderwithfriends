import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { PrivateRoute } from '+dumb/Routes'

import PartyIndex from './Index/entry'

import PartyNew from './New'

import NarrativeIndex from './_components/Narratives'
import ShowRoutes from './Show/entry'

export default class extends React.PureComponent {
  static displayName = __dirname.replace('src/slices/', '')

  render() {
    const { match: { url } } = this.props;

    return (
      <Switch>
        <PrivateRoute exact title="Parties" path={url} component={PartyIndex} />
        <PrivateRoute exact title="New Party" path={`${url}/new`} component={NarrativeIndex} />
        <PrivateRoute title="New Party" path={`${url}/new/:narrativeId`} component={PartyNew} />
        <Route path={`${url}/:partyId`} component={ShowRoutes} />
      </Switch>
    );
  }
}
