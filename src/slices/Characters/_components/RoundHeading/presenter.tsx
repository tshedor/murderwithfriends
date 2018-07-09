import * as React from 'react'

import { Helper } from '+dumb/Headers'

interface PresenterProps {
  round?: _types.Round
}

function roundName(roundId: number) {
  if (roundId === 0) {
    return 'Pre-Party';
  }

  return `Round ${roundId}`;
}

export default class extends React.PureComponent<PresenterProps, {}> {
  static displayName = __dirname.replace('src/slices/', '')

  render() {
    const { order, text } = this.props.round;

    const name = roundName(order);

    return (
      <header>
        <h2>{name}</h2>

        <Helper children={text} />
      </header>
    )
  }
}
