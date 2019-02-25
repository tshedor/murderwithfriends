import * as React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styles from './styles.scss';

import Button from '+dumb/Button'
import { Content } from '+dumb/Layouts'
import Loading from '+dumb/Loading'

class Narrative extends React.PureComponent {
  render() {
    const { displayName, id, previewText } = this.props;

    return (
      <Content title={displayName}>
        <React.Fragment>
          {previewText}

          <Button path={`/parties/new/${id}`} inverted>Create</Button>
        </React.Fragment>
      </Content>
    );
  }
}

export default class extends React.PureComponent {
  static displayName = __dirname.replace('src/slices/', '');

  render() {
    const { narratives } = this.props;

    return (
      <React.Fragment>
        <h1>Pick a Narrative</h1>
        <div className={styles.root}>
          { Object.keys(narratives).map(narrativeKey =>
            <Narrative
              key={narrativeKey}
              id={narrativeKey}
              previewText={narratives[narrativeKey].previewText}
              displayName={narratives[narrativeKey].displayName} />
          )}
        </div>
      </React.Fragment>
    )
  }
}
