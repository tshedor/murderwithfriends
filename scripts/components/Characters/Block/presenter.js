import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'components/Modules/Icon'
import Prompts from 'components/Characters/Prompts'

const Presenter = ({ character, characterId, children }) => {
  if (!character) {
    return null;
  }

  return (
    <div className="character">
      <h3>{character.displayName}</h3>
      {character.text}

      <ul>
        <li><Icon name="attire" /> {character.attire}</li>
        { character.relationships &&
          <li><Icon name="user" /> {character.relationships}</li>
        }
        <li><Prompts characterId={characterId} /></li>
      </ul>

      { children || null }
    </div>
  )
};

Presenter.propTypes = {
  characterId: PropTypes.string.isRequired,
  character: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

Presenter.displayName = __dirname.replace('scripts/components/', '');
export default Presenter;
