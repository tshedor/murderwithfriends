import React from 'react'
import PropTypes from 'prop-types'

import Character from '../_components/Block'

import styles from './styles.scss';

export default class extends React.PureComponent {
  static displayName = __dirname.replace('src/slices/', '')

  static defaultProps = {
    characters: {}
  }

  render() {
    const { characters } = this.props;

    return (
      <React.Fragment>
        <h1>Characters</h1>
        <div className={styles.root}>
          {characters.map(character =>
            <Character
              key={character.id}
              character={character}
              showName={true} />
          )}
        </div>
      </React.Fragment>
    )
  }
}
