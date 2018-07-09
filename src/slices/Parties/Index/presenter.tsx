import * as React from 'react'
import { Link } from 'react-router-dom'

import Icon from '+dumb/Icon'
import { SeparatedList } from '+dumb/Lists'
import Loading from '+dumb/Loading'

import Button from '+dumb/Button'

interface Data {
  allParties: Array<{ displayName: string, id: string }>
}

// TODO how is this supposed to be imported for TypeScript?
// https://www.apollographql.com/docs/react/recipes/static-typing.html#classes-vs-functions
export default class extends React.PureComponent<any, {}> {
  static displayName = __dirname.replace('src/slices/', '')

  render() {
    const { data: { allParties } } = this.props

    return (
      <React.Fragment>
        <h1>Parties</h1>

        <SeparatedList
          data={allParties}
          render={({ displayName }, key) => (
            <Link to={`/parties/${key}`}>{displayName} <Icon name="right" /></Link>
          )} />

        <Button path="/parties/new">New Party</Button>
      </React.Fragment>
    );
  }
};
