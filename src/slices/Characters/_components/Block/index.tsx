import * as React from 'react'

import { Content } from '+dumb/Layouts'

import Prompts from '../Prompts'
import InviteButton from '../InviteButton'
import PlayerName from '../PlayerName'

const styles = require('./styles.scss')

interface PresenterProps {
  character?: _types.Character
  characterId: string
  playerId?: string
  showName: boolean
}

const LineBreakify = ({ text }) => (
  <React.Fragment>
    {text.split('\n').map((paragraph, i) =>
      <p key={i}>
        {paragraph}
      </p>
    )}
  </React.Fragment>
);

export default class extends React.PureComponent<PresenterProps, {}> {
  static displayName = __dirname.replace('src/slices/', '')

  render() {
    const {
      character,
      playerId,
      showName } = this.props;

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
        <Prompts characterId={character.id} playerId={playerId} />

        <PlayerName playerId={playerId} />

        <Content title="TL;DR"><LineBreakify text={character.previewText} /></Content>

        <InviteButton playerId={playerId} />
      </div>
    );
  }
};
