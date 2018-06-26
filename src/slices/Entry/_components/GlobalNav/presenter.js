import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { logout } from 'utils/auth'

import PartyRoutes from '+root/slices/Parties/routes';
import Icon from '+dumb/Icon'

import styles from './styles.scss';

const NavLink = ({ path, iconName, text, ...props }) => (
  <li><Link to={path} {...props}><Icon name={iconName} />{text}</Link></li>
)

const Presenter = ({ authed, currentPartyUid, currentPlayerUid }) => {
  if (!authed) {
    return false;
  }

  return (
    <nav className={styles.globalNav}>
      <ul>
        { currentPartyUid &&
          <React.Fragment>
            { currentPlayerUid &&
              <NavLink
                path={`/parties/${currentPartyUid}/${currentPlayerUid}`}
                iconName="round"
                text="Rounds" />
            }
            <NavLink
              path={`/parties/${currentPartyUid}`}
              iconName="attire"
              text="My Party" />
            <NavLink
              path={`/parties/${currentPartyUid}/characters`}
              iconName="users"
              text="Characters" />
          </React.Fragment>
        }
        { authed &&
          <React.Fragment>
            <NavLink
              path="/parties"
              iconName="clue"
              text="Parties" />
            <NavLink
              path="/"
              iconName="logout"
              text="Logout"
              onClick={logout} />
          </React.Fragment>
        }
      </ul>
    </nav>
  );
};

Presenter.propTypes = {
  authed: PropTypes.bool,
  currentPartyUid: PropTypes.string,
  currentPlayerUid: PropTypes.string
};

Presenter.displayName = __dirname.replace('src/slices/', '');
export default Presenter;
