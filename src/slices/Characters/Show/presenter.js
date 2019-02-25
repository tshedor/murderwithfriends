import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Helper } from '+dumb/Headers'

import Character from '../_components/Block'
import Rounds from '../_components/Rounds'

export default class extends React.PureComponent {
  static displayName = __dirname.replace('src/slices/', '')

  static propTypes = {
    character: PropTypes.object,
    partyId: PropTypes.string,
    playerId: PropTypes.string,
  }

  static defaultProps = {
    character: {}
  }

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const {
      character,
      partyId,
      playerId
    } = this.props;

    return (
      <React.Fragment>
        <h1>{character.displayName}</h1>
        <Helper>
          New? Learn <Link to="/how-to-play">how to play</Link> or see the <Link to={`/parties/${partyId}`}>party deets</Link>.
        </Helper>

        <Rounds
          characterId={character.id}
          partyId={partyId} />

        <h2>About Me</h2>
        <Character character={character} playerId={playerId} />
      </React.Fragment>
    )
  }
}
