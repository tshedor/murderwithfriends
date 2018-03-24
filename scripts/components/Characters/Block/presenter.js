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
      <h2>{character.displayName}</h2>
      {character.text}

      <ul>
        <li><em>Attire</em>:<br />{character.attire}</li>
        { character.relationships &&
          <li><em>Relationships</em>:<br />{character.relationships}</li>
        }
        <li><em>Fill in the blank</em>:<br /><Prompts characterId={characterId} /></li>
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
