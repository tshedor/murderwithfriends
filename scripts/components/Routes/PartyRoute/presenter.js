import React from 'react'
import { Redirect } from 'react-router-dom'

export default class extends React.Component {
  state = {
    didFire: false
  }

  populateRedux = () => {
    this.props.onSetCurrentParty();

    document.title = `${this.props.title} | Murder with Friends`;

    this.setState({ didFire: true });
  }

  componentDidMount() {
    if (this.props.hasParty) {
      this.populateRedux();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.didFire) return;

    if (nextProps.hasParty === true) {
      this.populateRedux();
    }
  }

  render() {
    const { component: Component, hasParty } = this.props;

    if (hasParty === true) {
      return <Component />
    } else {
      return <h1>No Party here</h1>
    }
  }
}
