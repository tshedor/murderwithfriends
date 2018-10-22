import * as React from 'react'

import RoundHeading from '../RoundHeading'
import RoundImperatives from '../RoundImperatives'

const styles = require('./styles.scss');

interface RoundWrapper {
  id: string
  characterRounds: _types.Round[]
}

interface PresenterProps {
  allRounds?: RoundWrapper[]
  characterId: string
  currentRound: number
  partyId: string
}

export default class extends React.Component<PresenterProps, {}> {
  static displayName = __dirname.replace('src/slices/', '')

  static defaultProps = {
    allRounds: []
  }

  shouldComponentUpdate(nextProps) {
    const { allRounds, characterId } = this.props;
    const { allRounds: nextRounds, characterId: nextCharacterId } = nextProps;

    return allRounds.every(roundId => nextRounds.includes(roundId)) || characterId !== nextCharacterId;
  }

  render() {
    const { allRounds } = this.props;

    return (
      <React.Fragment>
        {allRounds.map(round =>
          <div className={styles.root} key={round.id}>
            <RoundHeading roundId={round.id} />
            {round.characterRounds.map(characterRound =>
              <RoundImperatives
                round={characterRound}
                key={characterRound.id} />
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}
