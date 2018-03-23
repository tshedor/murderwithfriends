import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default class extends React.Component {
  componentDidMount() {
    if (this.props.isPlayerInParty === true) {
      this.props.onSetCurrentParty();
      this.props.onSetCurrentPartyPlayer();

      document.title = `${this.props.title} | Murder with Friends`;
    }
  }

  render() {
    const { component: Component, isPlayerInParty } = this.props;

    if (isPlayerInParty === true) {
      return <Component />
    } else {
      return <Redirect to="/parties" />
    }
  }
}
