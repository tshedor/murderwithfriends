import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'components/Modules/Icon'

function nextRoundText(currentRound, totalRounds) {
  if (!currentRound || currentRound === -1) {
    return 'Start the Party';
  }

  if (currentRound === '3') {
    return 'Vote for the Killer';
  }

  if (currentRound === totalRounds.toString()) {
    return 'End the Party';
  }

  return 'Next Round';
}

function currentRoundText(currentRound, totalRounds) {
  if (!currentRound || currentRound === -1) {
    return `Party hasn't started`;
  }

  if (currentRound === '0') {
    return 'Currently Pre-Party';
  }

  if (currentRound === totalRounds.toString()) {
    return 'End of Party';
  }

  return `Currently Round ${currentRound}`;
}

const Presenter = ({ postscript, currentRound=-1, totalRounds=4, onAdvanceCurrentRound }) => {
  if (parseInt(currentRound, 10) > totalRounds) {
    return <p className="helper">{postscript}</p>;
  }

  return (
    <div className="button" onClick={onAdvanceCurrentRound}>
      {nextRoundText(currentRound, totalRounds)} <Icon name="right" />
      <em>{currentRoundText(currentRound, totalRounds)}</em>
    </div>
  )
};

Presenter.propTypes = {
  totalRounds: PropTypes.number,
  onAdvanceCurrentRound: PropTypes.func.isRequired,
  currentRound: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  postscript: PropTypes.string
};

Presenter.displayName = __dirname.replace('scripts/components/', '');
export default Presenter;
