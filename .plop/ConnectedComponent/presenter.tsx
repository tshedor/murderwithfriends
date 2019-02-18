import * as React from 'react'
import Loading from '+dumb/Loading'

import styles from './styles.css'

interface PresenterProps {
  {{> propInterfaceList }}
}

export default class extends React.PureComponent<PresenterProps, {}> {
  static displayName = __dirname.replace('src/slices/', '')

  render() {
    {{> propDeconstruction }}


    return <Loading />;
  }
};
