import * as React from 'react'

import RoundHeading from '../RoundHeading'
import RoundImperatives from '../RoundImperatives'

const styles = require('./styles.scss');

interface PresenterProps {
  availableRounds?: _types.Round[]
  characterId: string
  currentRound: number
  partyId: string
}

export default class extends React.Component<PresenterProps, {}> {
  static displayName = __dirname.replace('src/slices/', '')

  static defaultProps = {
    availableRounds: []
  }

  shouldComponentUpdate(nextProps) {
    const { currentRound, characterId } = this.props;
    const { currentRound: nextCurrentRound, characterId: nextCharacterId } = nextProps;

    return currentRound !== nextCurrentRound || characterId !== nextCharacterId;
  }

  render() {
    const { currentRound, characterId, availableRounds } = this.props;

    if (currentRound === -1) {
      return null;
    }

    return (
      <React.Fragment>
        {Object.keys(availableRounds).reverse().map(roundId => {
          const round = availableRounds[roundId];

          return (
            <div className={styles.root} key={roundId + characterId}>
              <RoundHeading text={round.roundText} order={parseInt(roundId, 10)} />
              <RoundImperatives
                round={round}
                key={roundId + characterId} />
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
