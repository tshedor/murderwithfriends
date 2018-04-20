import React from 'react'
import PropTypes from 'prop-types'

import Character from '../Block'

const Presenter = ({characters={}}) => (
  <React.Fragment>
    <h1>Characters</h1>
    {Object.keys(characters).map(key =>
      <Character
        key={key}
        characterId={key}
        character={characters[key]}
        showName={true} />
    )}
  </React.Fragment>
);

Presenter.propTypes = {
  characters: PropTypes.object
};

Presenter.displayName = __dirname.replace('scripts/components/', '');
export default Presenter;
