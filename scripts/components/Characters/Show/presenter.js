import React from 'react'
import PropTypes from 'prop-types'

import Character from '../Block'

const Presenter = ({ characterId }) => {
  if (!characterId) {
    return null;
  } else {
    return <Character characterId={characterId} />;
  }
};

Presenter.propTypes = {
  characterId: PropTypes.string
};

Presenter.displayName = __dirname.replace('scripts/components/', '');
export default Presenter;
