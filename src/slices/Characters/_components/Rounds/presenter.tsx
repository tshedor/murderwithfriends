import * as React from 'react'

import RoundHeading from '../RoundHeading'
import RoundImperatives from '../RoundImperatives'

const styles = require('./styles.scss');

interface PresenterProps {
  rounds?: string[]
  characterId: string
  partyId: string
}

export default class extends React.Component<PresenterProps, {}> {
  static displayName = __dirname.replace('src/slices/', '')

  static defaultProps = {
    rounds: []
  }

  shouldComponentUpdate(nextProps) {
    const { rounds, characterId } = this.props;
    const { rounds: nextRounds, characterId: nextCharacterId } = nextProps;

    return rounds.every(roundId => nextRounds.includes(roundId)) || characterId !== nextCharacterId;
  }

  render() {
    const { rounds, partyId, characterId } = this.props;

    return (
      <React.Fragment>
        {rounds.map(roundId =>
          <div className={styles.root} key={roundId}>
            <RoundHeading roundId={roundId} />
            <RoundImperatives
              roundId={roundId}
              characterId={characterId}
              partyId={partyId} />
          </div>
        )}
      </React.Fragment>
    );
  }
}
