import React from 'react'
import PropTypes from 'prop-types'

import Loading from '+dumb/Loading'

import Character from '../_components/Block'

import styles from './styles.scss';

export default class extends React.PureComponent {
  static displayName = __dirname.replace('src/slices/', '')

  static defaultProps = {
    characters: {}
  }

  render() {
    const { characters } = this.props;

    if (!characters) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <h1>Characters</h1>
        <div className={styles.root}>
          {Object.keys(characters).map(key =>
            <Character
              key={key}
              characterId={key}
              character={characters[key]}
              showName={true} />
          )}
        </div>
      </React.Fragment>
    )
  }
}
