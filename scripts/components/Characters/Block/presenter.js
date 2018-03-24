import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'components/Modules/Icon'
import { TextInput } from 'components/Modules/Inputs'
import Prompts from '../Prompts'

export default class extends React.Component {
  static propTypes = {
    characterId: PropTypes.string.isRequired,
    character: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ]),
    actorName: PropTypes.string,
    onSaveActorName: PropTypes.func.isRequired
  }

  displayName = __dirname.replace('scripts/components/', '')

  handleActorInput = e => {
    this.props.onSaveActorName(this.actor.value);
  }

  render() {
    const { character, characterId, isPartyMaster, actorName, children } = this.props;

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
          <li>
            {isPartyMaster ? (
              <TextInput
                label="Played by"
                defaultValue={actorName}
                onKeyDown={this.handleActorInput}
                inputRef={val => this.actor = val}
                />
            ) : (
              <React.Fragment>{actorName}</React.Fragment>
            )}
          </li>
        </ul>


        { children || null }
      </div>
    );
  }
};
