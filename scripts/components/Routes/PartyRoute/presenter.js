import React from 'react'
import { Redirect } from 'react-router-dom'

export default class extends React.Component {
  state = {
    didFireParty: false
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.didFireParty) return;

    if (nextProps.hasParty === true) {
      this.props.onSetCurrentParty();

      document.title = `${this.props.title} | Murder with Friends`;

      this.setState({ didFireParty: true });
    }
  }

  render() {
    const { component: Component, hasParty } = this.props;

    if (hasParty === true) {
      return <Component />
    } else {
      return 'No Party here'
    }
  }
}
