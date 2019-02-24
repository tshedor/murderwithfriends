import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { logout } from 'utils/auth'

import Icon from 'components/Modules/Icon'

const Presenter = ({ authed, currentPartyUid, currentPlayerUid }) => (
  <nav className="global-nav">
    <ul>
      {currentPlayerUid &&
        <li><Link to={`/parties/${currentPartyUid}/${currentPlayerUid}`}><Icon name="round" />Rounds</Link></li>
      }
      {currentPartyUid &&
        <li><Link to={`/parties/${currentPartyUid}`}><Icon name="attire" />My Party</Link></li>
      }
      {currentPartyUid &&
        <li><Link to={`/parties/${currentPartyUid}/characters`}><Icon name="users" />Characters</Link></li>
      }
      {authed &&
        <li><Link to="/parties"><Icon name="clue" />Parties</Link></li>
      }
      {authed &&
        <li><Link to="/" onClick={logout}><Icon name="logout" />Logout</Link></li>
      }
    </ul>
  </nav>
);

Presenter.propTypes = {
  authed: PropTypes.bool,
  currentPartyUid: PropTypes.string,
  currentPlayerUid: PropTypes.string
};

Presenter.displayName = __dirname.replace('src/components/', '');
export default Presenter;
