import * as React from 'react'
import { Link } from 'react-router-dom'

import Icon from '+dumb/Icon'
import { SeparatedList } from '+dumb/Lists'

import Button from '+dumb/Button'

interface PresenterProps {
  parties?: object;
}

export default class extends React.PureComponent<PresenterProps, {}> {
  static displayName = __dirname.replace('src/slices/', '')

  render() {
    const { parties } = this.props;

    return (
      <React.Fragment>
        <h1>Parties</h1>

        <SeparatedList
          data={parties}
          render={(item, key) => (
            <Link to={`/parties/${key}`}>{item.displayName} <Icon name="right" /></Link>
          )} />

        <Button path="/parties/new">New Party</Button>
      </React.Fragment>
    );
  }
};
