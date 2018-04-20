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
    <h3>Instructions</h3>

    <ol className="numbered-list -autocount">
      {Object.values(instructions).map(instruction =>
        <li key={instruction.text}>
          <div className="inside">
            <strong>{ instruction.isOptional ? 'OPTIONAL: ' : '' }</strong>
            {instruction.text}
          </div>
        </li>
      )}
    </ol>
  </div>
);

const LineBreakify = ({text}) => (
  <React.Fragment>
    {text.split('\n').map((paragraph, i) =>
      <p key={i}>
        {paragraph}
      </p>
    )}
  </React.Fragment>
)

Instructions.propTypes = {
  instructions: PropTypes.array
};

const Clues = ({ clues }) => (
  <div className="section">
    <h3>Clues</h3>

    <ol className="numbered-list -autocount">
      {Object.values(clues).map(clue =>
        <li key={clue.text}>
          <div className="inside">{clue.text}</div>
        </li>
      )}
    </ol>
  </div>
);

Clues.propTypes = {
  clues: PropTypes.array
};

export default class extends React.Component {
  static propTypes = {
    round: PropTypes.object,
    currentRoundId: PropTypes.string
  }

  static displayName = __dirname.replace('scripts/components/', '')

  render() {
    const { round, roundId, currentRoundId } = this.props;

    if (!round) {
      return null;
    }

    return (
      <div className="round">
        <header>
          <h2>{roundName(roundId)}</h2>

          <div className="helper">
            {round.roundText || round.text}
          </div>
        </header>

        <React.Fragment>
          {round.roundText &&
            <React.Fragment>
              <h3>Updates</h3>
              <aside className="content">
                <LineBreakify text={round.text} />
              </aside>
            </React.Fragment>
          }
          {round.instructions &&
            <Instructions instructions={round.instructions} />
          }

          { round.clues &&
            <Clues clues={round.clues} />
          }
        </React.Fragment>
      </div>
    );
  }
};
