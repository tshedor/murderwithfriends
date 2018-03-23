import React from 'react'
import PropTypes from 'prop-types'

import Character from '../Block'

const Presenter = ({characters={}}) => (
  <div className="characters">
    {Object.keys(characters).map(key =>
      <Character key={key} characterId={key} character={characters[key]} />
    )}
  </div>
);

Presenter.propTypes = {
  characters: PropTypes.object
};

Presenter.displayName = __dirname.replace('scripts/components/', '');
export default Presenter;
