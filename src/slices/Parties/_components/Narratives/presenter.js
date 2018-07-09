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
    const { data: { allNarratives = [] } } = this.props;

    return (
      <React.Fragment>
        <h1>Pick a Narrative</h1>
        <div className={styles.root}>
          { allNarratives.map(narrative =>
            <Narrative
              key={narrative.id}
              id={narrative.id}
              previewText={narrative.previewText}
              displayName={narrative.displayName} />
          )}
        </div>
      </React.Fragment>
    )
  }
}
