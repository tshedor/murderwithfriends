import * as React from 'react'
import { Link } from 'react-router-dom'

import Icon from '+dumb/Icon'
import { SeparatedList } from '+dumb/Lists'

import Button from '+dumb/Button'

interface Data {
  parties: object
}

// TODO how is this supposed to be imported for TypeScript?
// https://www.apollographql.com/docs/react/recipes/static-typing.html#classes-vs-functions
export default class extends React.PureComponent<any, {}> {
  static displayName = __dirname.replace('src/slices/', '')

  render() {
    const { parties } = this.props;

    return (
      <React.Fragment>
        <h1>Parties</h1>

        { parties &&
          <SeparatedList
            data={Object.values(parties)}
            render={({ displayName }, key) => (
              <Link to={`/parties/${key}`}>{displayName} <Icon name="right" /></Link>
            )} />
        }

        <Button path="/parties/new">New Party</Button>
      </React.Fragment>
    );
  }
};
