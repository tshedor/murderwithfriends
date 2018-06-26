import React from 'react'
import PropTypes from 'prop-types'

import Icon from '+dumb/Icon'
import { Helper } from '+dumb/Headers'
import Button from '+dumb/Button'

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
  const roundNumber = parseInt(currentRound, 10);

  if (roundNumber > totalRounds) {
    return <Helper children={postscript} />
  }

  return (
    <Button large onClick={onAdvanceCurrentRound}>
      {nextRoundText(currentRound, totalRounds)}
      <Icon name="right" />
      <em>{currentRoundText(currentRound, totalRounds)}</em>
    </Button>
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

Presenter.displayName = __dirname.replace('src/slices/', '');
export default Presenter;
