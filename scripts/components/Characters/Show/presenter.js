import React from 'react'
import PropTypes from 'prop-types'

import Character from '../Block'

import Rounds from 'components/Rounds/Index'

const Presenter = ({ displayName, characterId }) => {
  if (!characterId) {
    return null;
  } else {
    return (
      <React.Fragment>
        <h1>{displayName}</h1>
        <Rounds />
        <Character characterId={characterId} />
      </React.Fragment>
    );
  }
};

Presenter.propTypes = {
  characterId: PropTypes.string
};

Presenter.displayName = __dirname.replace('scripts/components/', '');
export default Presenter;
