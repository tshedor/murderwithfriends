import React from 'react'
import { Switch } from 'react-router-dom'
import { PrivateRoute } from '+root/universal/routes'

import PartyShow from './index'
import CharacterIndex from '+root/slices/Characters/Index'
import CharacterShow from '+root/slices/Characters/Show'

export default class extends React.PureComponent {
  static displayName = __dirname.replace('src/slices/', '')

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    // TODO bad practice to use path?
    //   for convenience, /:partyId is grabbed in later routes
    const { match: { path } } = this.props;

    return (
      <Switch>
        <PrivateRoute title="All Characters" path={`${path}/characters`} component={CharacterIndex} />
        <PrivateRoute title="My Character" path={`${path}/:playerId`}  component={CharacterShow} />
        <PrivateRoute title="My Party" path={path} component={PartyShow} />
      </Switch>
    );
  }
}
