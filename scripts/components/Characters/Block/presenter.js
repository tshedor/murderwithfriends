import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'components/Modules/Icon'
import { TextInput } from 'components/Modules/Inputs'
import Prompts from '../Prompts'

import InviteButton from '../InviteButton'

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
    onSaveActorName: PropTypes.func.isRequired,
    showName: PropTypes.bool
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
        { this.props.showName &&
          <h2>{character.displayName}</h2>
        }
        <div className="content">{character.text}</div>

        <h3>Attire</h3>
        <div className="content">{character.attire}</div>

        {character.relationships &&
          <React.Fragment>
            <h3>Relationships</h3>
            <div className="content">{character.relationships}</div>
          </React.Fragment>
        }

        <h3>Fill in the blank</h3>
        <Prompts characterId={characterId} />

        <h3>Played by</h3>
        <div className="content">
          {isPartyMaster ? (
            <TextInput
              defaultValue={actorName}
              onKeyDown={this.handleActorInput}
              inputRef={val => this.actor = val}
              />
          ) : (
            <React.Fragment>{actorName}</React.Fragment>
          )}
        </div>

        <InviteButton characterId={characterId} />
      </div>
    );
  }
};
