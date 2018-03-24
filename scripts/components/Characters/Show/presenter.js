import React from 'react'
import PropTypes from 'prop-types'

import Character from '../Block'

import Rounds from 'components/Rounds/Index'

const Presenter = ({ characterId }) => {
  if (!characterId) {
    return null;
  } else {
    return (
      <React.Fragment>
        <Character characterId={characterId} />
        <Rounds />
      </React.Fragment>
    );
  }
};

Presenter.propTypes = {
  characterId: PropTypes.string
};

Presenter.displayName = __dirname.replace('scripts/components/', '');
export default Presenter;
