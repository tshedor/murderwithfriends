import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { logout } from 'utils/auth'

import Icon from 'components/Modules/Icon'

const Presenter = ({ authed, currentPartyUid, currentPlayerUid }) => (
  <nav className="global-nav">
    <ul>
      {currentPlayerUid &&
        <li><Link to={`/parties/${currentPartyUid}/${currentPlayerUid}`}><Icon name="round" /></Link></li>
      }
      {currentPartyUid &&
        <li><Link to={`/parties/${currentPartyUid}`}><Icon name="attire" /></Link></li>
      }
      {currentPartyUid &&
        <li><Link to={`/parties/${currentPartyUid}/characters`}><Icon name="users" /></Link></li>
      }
      {authed &&
        <li><Link to="/parties"><Icon name="clue" /></Link></li>
      }
      {authed &&
        <li><Link to="/" onClick={logout}><Icon name="logout" /></Link></li>
      }
    </ul>
  </nav>
);

Presenter.propTypes = {
  authed: PropTypes.bool,
  currentPartyUid: PropTypes.string,
  currentPlayerUid: PropTypes.string
};

Presenter.displayName = __dirname.replace('scripts/components/', '');
export default Presenter;
