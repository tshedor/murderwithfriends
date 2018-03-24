import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'components/Modules/Icon'

function roundName(roundId) {
  if (roundId === '0') {
    return 'Pre-Party';
  }

  return `Round ${roundId}`;
}

const Instructions = ({ instructions }) => (
  <div className="section">
    <header>
      <h3>Instructions <Icon name="check" /></h3>
    </header>

    <aside>
      <ul>
        {Object.values(instructions).map(instruction =>
          <li key={instruction.text}>
            { instruction.isOptional ? 'OPTIONAL: ' : '' }
            {instruction.text}
          </li>
        )}
      </ul>
    </aside>
  </div>
);

Instructions.propTypes = {
  instructions: PropTypes.array
};

const Clues = ({ clues }) => (
  <div className="section">
    <header>
      <h3>Clues <Icon name="clue" /></h3>
    </header>

    <aside>
      <ul>
        {Object.values(clues).map(clue =>
          <li key={clue.text}>
            {clue.text}
          </li>
        )}
      </ul>
    </aside>
  </div>
);

Clues.propTypes = {
  clues: PropTypes.array
};

export default class extends React.Component {
  state = {
    showRound: false
  }

  constructor(props) {
    super(props)

    this.state = {
      showRound: this.props.roundId === this.props.currentRoundId
    }
  }

  static propTypes = {
    round: PropTypes.object,
    currentRoundId: PropTypes.string
  }

  static displayName = __dirname.replace('scripts/components/', '')

  render() {
    const { round, roundId, currentRoundId } = this.props;
    const { showRound } = this.state;

    if (!round) {
      return null;
    }

    return (
      <div className="round">
        <header className="round-header" onClick={() => this.setState({ showRound: !showRound })}>
          <h2>
            <Icon name={this.state.showRound ? 'down' : 'right'} />
            {roundName(roundId)}
          </h2>

          {showRound &&
            <div className="round-text">
              {round.roundText || round.text}
            </div>
          }
        </header>

        { showRound &&
          <React.Fragment>
            <div className="section">
              <header>
                <h3>Updates <Icon name="info" /></h3>
              </header>

              <aside>
                {round.text}
              </aside>
            </div>
            {round.instructions &&
              <Instructions instructions={round.instructions} />
            }

            { round.clues &&
              <Clues clues={round.clues} />
            }
          </React.Fragment>
        }
      </div>
    );
  }
};
