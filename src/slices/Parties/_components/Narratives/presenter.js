import * as React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styles from './styles.scss';

import Button from '+dumb/Button'
import { Content } from '+dumb/Layouts'

const Narrative = ({ narrative, narrativeId }) => (
  <Content title={narrative.displayName}>
    <React.Fragment>
      {narrative.text}

      <Button path={`/parties/new/${narrativeId}`} inverted>Create</Button>
    </React.Fragment>
  </Content>
);

export default class extends React.PureComponent {
  static displayName = __dirname.replace('src/slices/', '');

  render() {
    const { narratives } = this.props;

    return (
      <React.Fragment>
        <h1>Pick a Narrative</h1>
        <div className={styles.root}>
          { Object.keys(narratives).map(key =>
            <Narrative
              key={key}
              narrativeId={key}
              narrative={narratives[key]} />
          )}
        </div>
      </React.Fragment>
    )
  }
}
