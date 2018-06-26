import React from 'react'
import { Switch } from 'react-router-dom'
import { PrivateRoute } from '+dumb/Routes'

import PartyShow from './index'
import CharacterIndex from '+root/slices/Characters/Index/entry'
import CharacterShow from '+root/slices/Characters/Show/entry'

export default class extends React.Component {
  static displayName = __dirname.replace('src/slices/', '')

  render() {
    return (
      <Switch>
        <PrivateRoute title="All Characters" path="/parties/:partyId/characters" component={CharacterIndex} />
        <PrivateRoute title="My Character" path="/parties/:partyId/:playerId" component={CharacterShow} />
        <PrivateRoute title="My Party" path="/parties/:partyId" component={PartyShow} />
      </Switch>
    );
  }
}
