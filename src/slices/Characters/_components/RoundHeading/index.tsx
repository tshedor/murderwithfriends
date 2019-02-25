import * as React from 'react'

import { Helper } from '+dumb/Headers'

interface PresenterProps {
  order?: number
  text: string
}

function roundName(roundId: number) {
  if (roundId === 0) {
    return 'Round 1';
  }

  return `Round ${roundId + 1}`;
}

export default class extends React.PureComponent<PresenterProps, {}> {
  static displayName = __dirname.replace('src/slices/', '')

  render() {
    const { order, text } = this.props;

    const name = roundName(order);

    return (
      <header>
        <h2>{name}</h2>

        <Helper children={text} />
      </header>
    )
  }
}
