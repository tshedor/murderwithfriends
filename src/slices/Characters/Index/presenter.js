import React from 'react'
import PropTypes from 'prop-types'

import Character from '../_components/Block'

import styles from './styles.scss';

export default class extends React.PureComponent {
  static displayName = __dirname.replace('src/slices/', '')

  static defaultProps = {
    players: []
  }

  render() {
    const { players } = this.props;

    return (
      <React.Fragment>
        <h1>Characters</h1>
        <div className={styles.root}>
          {players.map(player =>
            <Character
              playerId={player.id}
              key={player.id}
              character={player.character}
              showName={true} />
          )}
        </div>
      </React.Fragment>
    )
  }
}
