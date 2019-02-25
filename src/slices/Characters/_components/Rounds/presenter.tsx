import * as React from 'react'

import RoundHeading from '../RoundHeading'
import RoundImperatives from '../RoundImperatives'

const styles = require('./styles.scss');

interface RoundWrapper {
  id: string
  characterRounds: _types.Round[]
}

interface PresenterProps {
  availableRounds?: RoundWrapper[]
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

    const allRounds = [...Array(currentRound)].map((_, idx) => idx).reverse();

    return (
      <React.Fragment>
        {allRounds.map((round, idx) => {
          const round = availableRounds[idx];

          return (
            <div className={styles.root} key={idx + characterId}>
              <RoundHeading text={round.text} order={round.order} />
              <RoundImperatives
                round={round.characters[characterId]}
                key={idx + characterId} />
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
