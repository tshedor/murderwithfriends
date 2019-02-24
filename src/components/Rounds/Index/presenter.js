import React from 'react'
import PropTypes from 'prop-types'

import Round from '../Block'

function sortKeys(rounds) {
  let keys = Object.keys(rounds);

  return keys.sort((a, b) => b - a);
}

const Presenter = ({narrativeRounds}) => (
  <React.Fragment>
    {sortKeys(narrativeRounds).map(roundId =>
      <Round round={narrativeRounds[roundId]} key={roundId} roundId={roundId} />
    )}
  </React.Fragment>
);

Presenter.propTypes = {
  narrativeRounds: PropTypes.object
};

Presenter.defaultProps = {
  narrativeRounds: {}
};

Presenter.displayName = __dirname.replace('src/components/', '');
export default Presenter;
