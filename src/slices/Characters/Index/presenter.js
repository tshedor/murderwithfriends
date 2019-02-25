import React from 'react'
import PropTypes from 'prop-types'

import Character from '../_components/Block'

import styles from './styles.scss';

export default class extends React.PureComponent {
  static displayName = __dirname.replace('src/slices/', '')

  static defaultProps = {
    players: {},
    characters: {}
  }

  render() {
    const { players, characters } = this.props;
    return (
      <React.Fragment>
        <h1>Characters</h1>
        <div className={styles.root}>
          {Object.keys(players).map(playerId =>
            <Character
              playerId={playerId}
              key={playerId}
              character={characters[players[playerId]?.characterId]}
              showName={true} />
          )}
        </div>
      </React.Fragment>
    )
  }
}
