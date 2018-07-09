import * as React from 'react'

import Icon from '+dumb/Icon'
import { TextInput } from '+dumb/Inputs'
import Loading from '+dumb/Loading'
import { Content } from '+dumb/Layouts'

import Prompts from '../Prompts'
import InviteButton from '../InviteButton'
import ActorInput from '../ActorInput'

const styles = require('./styles.scss')

interface PresenterProps {
  character?: _types.Character
  characterId: string
  showName: boolean
}

export default class extends React.PureComponent<PresenterProps, {}> {
  static displayName = __dirname.replace('src/slices/', '')

  render() {
    const {
      character,
      showName } = this.props;

    if (!character) {
      return <Loading />;
    }

    return (
      <div className={styles.root}>
        { showName &&
          <h2>{character.displayName}</h2>
        }
        <Content>{character.text}</Content>

        <Content title="Attire">{character.attire}</Content>

        {character.relationships &&
          <Content title="Relationships" children={character.relationships} />
        }

        <h3>Fill in the blank</h3>
        <Prompts characterId={character.id} />

        <ActorInput />

        <InviteButton />
      </div>
    );
  }
};
