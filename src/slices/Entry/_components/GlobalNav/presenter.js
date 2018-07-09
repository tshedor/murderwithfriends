import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { removeToken } from '+root/utils/auth'

import PartyRoutes from '+root/slices/Parties/routes';
import Icon from '+dumb/Icon'

import styles from './styles.scss';

const NavLink = ({ path, iconName, text, ...props }) => (
  <li><Link to={path} {...props}><Icon name={iconName} />{text}</Link></li>
);

const Presenter = ({ authed, currentPartyId, currentPlayerId }) => (
  <nav className={styles.root}>
    <ul>
      { currentPartyId &&
        <React.Fragment>
          { currentPlayerId &&
            <NavLink
              path={`/parties/${currentPartyId}/${currentPlayerId}`}
              iconName="round"
              text="Rounds" />
          }
          <NavLink
            path={`/parties/${currentPartyId}`}
            iconName="attire"
            text="My Party" />
          <NavLink
            path={`/parties/${currentPartyId}/characters`}
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
            onClick={removeToken} />
        </React.Fragment>
      }
    </ul>
  </nav>
);

Presenter.propTypes = {
  authed: PropTypes.bool,
  currentPartyId: PropTypes.string,
  currentPlayerId: PropTypes.string
};

Presenter.displayName = __dirname.replace('src/slices/', '');

export default Presenter;
