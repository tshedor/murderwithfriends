import * as React from 'react'

import Round from '+dumb/Round'

interface PresenterProps {
  rounds?: object
}

function sortKeys(rounds) {
  let keys = Object.keys(rounds).map(key => parseInt(key, 10));

  return keys.sort((a, b) => b - a);
}

export default class extends React.PureComponent<PresenterProps, {}> {
  static displayName = __dirname.replace('src/slices/', '')

  static defaultProps = {
    rounds: {}
  }

  render() {
    const { rounds } = this.props;

    return (
      <React.Fragment>
        {sortKeys(rounds).map(roundId =>
          <Round
            round={rounds[roundId]}
            key={roundId}
            roundId={roundId} />
        )}
      </React.Fragment>
    );
  }
}
