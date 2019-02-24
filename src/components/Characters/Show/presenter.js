import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Character from '../Block'

import Rounds from 'components/Rounds/Index'

export default class extends React.Component {
  state = {
    hasFired: false
  }

  static displayName = __dirname.replace('src/components/', '')

  static propTypes = {
    displayName: PropTypes.string,
    characterId: PropTypes.string,
    currentPartyUid: PropTypes.string
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.hasFired && nextProps.currentPlayerUid && nextProps.currentPartyUid) {
      this.props.onFindCharacterId(nextProps.currentPartyUid, nextProps.currentPlayerUid);
      this.setState({ hasFired: true });
    }
  }

  render() {
    const { displayName, characterId, currentPartyUid } = this.props;

    if (!characterId) {
      return null;
    }

    return (
      <React.Fragment>
        <h1>{displayName}</h1>
        <div className="helper">
          New? Learn <Link to="/how-to-play">how to play</Link> or see the <Link to={`/parties/${currentPartyUid}`}>party deets</Link>.
        </div>

        <Rounds />

        <h2>About Me</h2>

        { characterId &&
          <Character characterId={characterId} />
        }
      </React.Fragment>
    )
  }
}
