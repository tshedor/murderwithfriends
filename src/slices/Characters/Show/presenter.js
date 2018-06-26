import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Loading from '+dumb/Loading'
import { Helper } from '+dumb/Headers'

import Character from '../_components/Block'
import Rounds from '../_components/Rounds'

export default class extends React.Component {
  state = {
    hasFired: false
  }

  static displayName = __dirname.replace('src/slices/', '')

  static propTypes = {
    character: PropTypes.object,
    currentPartyUid: PropTypes.string,
    currentCharacterUid: PropTypes.string
  }

  render() {
    const { character, currentPartyUid, currentCharacterUid } = this.props;

    if (!character?.displayName) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <h1>{character.displayName}</h1>
        <Helper>
          New? Learn <Link to="/how-to-play">how to play</Link> or see the <Link to={`/parties/${currentPartyUid}`}>party deets</Link>.
        </Helper>

        <Rounds />

        <h2>About Me</h2>
        <Character characterId={currentCharacterUid} character={character} />
      </React.Fragment>
    )
  }
}
