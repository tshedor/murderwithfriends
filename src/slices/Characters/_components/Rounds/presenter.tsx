import * as React from 'react'

import RoundHeading from '../RoundHeading'
import RoundImperatives from '../RoundImperatives'

const styles = require('./styles.scss');
const { rounds: roundData } = require('./info.json');

interface RoundWrapper {
  id: string
  characterRounds: _types.Round[]
}

interface PresenterProps {
  allRounds?: RoundWrapper[]
  characterId: string
  displayName: string
  currentRound: number
  partyId: string
}

export default class extends React.Component<PresenterProps, {}> {
  static displayName = __dirname.replace('src/slices/', '')

  static defaultProps = {
    allRounds: []
  }

  shouldComponentUpdate(nextProps) {
    const { currentRound, characterId, displayName } = this.props;
    const { currentRound: nextCurrentRound, characterId: nextCharacterId, displayName: nextDisplayName } = nextProps;

    return currentRound !== nextCurrentRound || characterId !== nextCharacterId || displayName !== nextDisplayName;
  }

  render() {
    const { currentRound, characterId, displayName } = this.props;

    const allRounds = [...Array(currentRound)].map((_, idx) => idx).reverse();

    return (
      <React.Fragment>
        {allRounds.map((idx) => {
          const round = roundData[ idx ];

          return (
            <div className={styles.root} key={idx + characterId}>
              <RoundHeading text={round.text} order={round.order} />
              <RoundImperatives
                round={round.characters[displayName]}
                key={idx + characterId} />
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
