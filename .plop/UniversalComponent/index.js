import React from 'react'
import Loading from '+dumb/Loading'

import styles from './styles.css'

export default class extends React.PureComponent {
  static displayName = __dirname.replace('src/universal/dumb/', '')

  render() {
    {{> propDeconstruction}}


    return <Loading />;
  }
};
