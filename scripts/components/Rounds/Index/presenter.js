import React from 'react'
import PropTypes from 'prop-types'

import Round from '../Block'

const Presenter = ({narrativeRounds}) => (
  <React.Fragment>
    {Object.keys(narrativeRounds).map(roundId =>
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

Presenter.displayName = __dirname.replace('scripts/components/', '');
export default Presenter;
