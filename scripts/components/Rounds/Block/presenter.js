import React from 'react'
import PropTypes from 'prop-types'

function roundName(roundId) {
  if (roundId === '0') {
    return 'Pre-Party';
  }

  return `Round ${roundId}`;
}

const Instructions = ({ instructions }) => (
  <ul>
    {Object.values(instructions).map(instruction =>
      <li>
        { instruction.isOptional ? 'OPTIONAL:' : '' }&nbsp;
        {instruction.text}
      </li>
    )}
  </ul>
);

const Clues = ({ clues }) => (
  <ul>
    {Object.values(clues).map(clue =>
      <li>
        {clue.text}
      </li>
    )}
  </ul>
);

const Presenter = ({round, roundId}) => (
  <div className="round">
    <header>
      <h3>{roundName(roundId)}</h3>

      {round.roundText || round.text}
    </header>

    <div className="round-content">
      {round.text}
      {round.instructions &&
        <Instructions instructions={round.instructions} />
      }

      { round.clues &&
        <Clues clues={round.clues} />
      }
    </div>
  </div>
);

Presenter.propTypes = {
  round: PropTypes.object,
  roundId: PropTypes.number
};

Presenter.displayName = __dirname.replace('scripts/components/', '');
export default Presenter;
