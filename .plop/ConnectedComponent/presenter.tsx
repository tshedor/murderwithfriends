import * as React from 'react'
import Loading from '+dumb/Loading'

const styles = require('./styles.scss')

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
