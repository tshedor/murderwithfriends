import React from 'react'
import PropTypes from 'prop-types'

import Loading from 'components/Modules/Routes/Loading'

export default class extends React.Component {
  static propTypes = {
    onInitializeListeners: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.onInitializeListeners();
  }

  render() {
    // if (this.props.isLoading) {
    //   return <Loading />;
    // }

    return null;
  }
};
