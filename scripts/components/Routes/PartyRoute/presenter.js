import React from 'react'
import { Redirect } from 'react-router-dom'

export default class extends React.Component {
  componentDidMount() {
    if (this.props.hasParty === true) {
      this.props.onSetCurrentParty();

      document.title = `${this.props.title} | Murder with Friends`;
    }
  }

  render() {
    const { component: Component, hasParty } = this.props;

    if (hasParty === true) {
      return <Component />
    } else {
      return <Redirect to="/parties" />
    }
  }
}
