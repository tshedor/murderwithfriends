import React from 'react'

export default class extends React.Component {
  state = {
    didFire: false
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.didFire) return;

    if (nextProps.isPlayerInParty === true) {
      this.props.onSetCurrentParty();
      this.props.onSetCurrentPartyPlayer();

      document.title = `${this.props.title} | Murder with Friends`;

      this.setState({ didFire: true });
    }
  }

  render() {
    const { component: Component, isPlayerInParty } = this.props;

    if (isPlayerInParty === true) {
      return <Component />
    } else {
      return "You're not supposed to be here"
    }
  }
}
