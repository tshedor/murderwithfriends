import React from 'react'

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
    this.populateRedux();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.didFire) return;
    
    this.populateRedux();
  }

  render() {
    const { component: Component, isPlayerInParty } = this.props;

    return <Component />
  }
}
