import React from 'react'
import PropTypes from 'prop-types'

import Icon from '+dumb/Icon'
import { Helper } from '+dumb/Headers'
import Button from '+dumb/Button'

import styles from './styles.scss'

function previousRoundText(currentRound, totalRounds) {
  if (!currentRound || currentRound === -1) {
    return false;
  }

  return 'Previous Round';
}

function currentRoundText(currentRound, totalRounds) {
  switch(currentRound) {
    case 0 : return 'Pre-Party';
    case -1 : return `Party hasn't started`;
    case totalRounds : return 'End of Party';
    default : return `Round ${currentRound}`
  }
}

function nextRoundText(currentRound, totalRounds) {
  switch(currentRound) {
    case 0 :
    case -1 :
      return 'Start the Party';
    case 3 : return 'Vote for the Killer';
    case totalRounds : return false;
    default : return 'Next Round'
  }
}

function compileRoundText(currentRound, totalRounds) {
  return {
    previous: previousRoundText(currentRound, totalRounds),
    current: currentRoundText(currentRound, totalRounds),
    next: nextRoundText(currentRound, totalRounds)
  };
}

const Presenter = ({ postscript, currentRound=-1, totalRounds=4, onPrevious, onNext, loading }) => {
  const roundText = compileRoundText(currentRound, totalRounds);

  if (currentRound > totalRounds) {
    return <Helper children={postscript} />
  }

  return (
    <div className={styles.root}>
      { roundText.previous &&
        <Button onClick={onPrevious} iconName="left">{roundText.previous}</Button>
      }

      <Helper children={loading ? 'Loading...' : roundText.current} />

      { roundText.next &&
        <Button onClick={onNext} iconName="right">{roundText.next}</Button>
      }
    </div>
  )
};

Presenter.propTypes = {
  totalRounds: PropTypes.number,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  currentRound: PropTypes.number,
  postscript: PropTypes.string
};

Presenter.displayName = __dirname.replace('src/slices/', '');
export default Presenter;
