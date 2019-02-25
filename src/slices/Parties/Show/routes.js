import React from 'react'
import { Switch, Route } from 'react-router-dom'

import PartyShow from './index'
// You found it. The caveat. I broke a rule.
// Better to break a rule than be obscure.
import CharacterIndex from '+root/slices/Characters/Index'
import CharacterShow from '+root/slices/Characters/Show'

export default class extends React.PureComponent {
  static displayName = __dirname.replace('src/slices/', '')

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    // TODO bad practice to use path instead of url?
    //   for convenience, /:partyId is grabbed in later routes
    const { match: { path } } = this.props;

    return (
      <Switch>
        <Route title="All Characters" path={`${path}/characters`} component={CharacterIndex} />
        <Route title="My Character" path={`${path}/:playerId`}  component={CharacterShow} />
        <Route title="My Party" path={path} component={PartyShow} />
      </Switch>
    );
  }
}
