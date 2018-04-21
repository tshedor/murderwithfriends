import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Character from '../Block'

import Rounds from 'components/Rounds/Index'

const Presenter = ({ displayName, characterId, currentPartyUid }) => {
  if (!characterId) {
    return null;
  } else {
    return (
      <React.Fragment>
        <h1>{displayName}</h1>
        <div className="helper">
          New? Learn <Link to="/how-to-play">how to play</Link> or see the <Link to={`/parties/${currentPartyUid}`}>party deets</Link>.
        </div>

        <Rounds />

        <h2>About Me</h2>
        <Character characterId={characterId} />
      </React.Fragment>
    );
  }
};

Presenter.propTypes = {
  displayName: PropTypes.string,
  characterId: PropTypes.string,
  currentPartyUid: PropTypes.string
};

Presenter.displayName = __dirname.replace('scripts/components/', '');
export default Presenter;
