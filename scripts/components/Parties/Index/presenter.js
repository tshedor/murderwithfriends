import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import Icon from 'components/Modules/Icon'

const Presenter = ({parties}) => (
  <div className="parties">
    <h1>Parties</h1>
    <ul>
      {Object.keys(parties).map(key =>
        <li key={key}>
          <Link to={`/parties/${key}`}>{parties[key].displayName} <Icon name="right" /></Link>
        </li>
      )}
    </ul>

    <Link to="/parties/new" className="button">New Party</Link>
  </div>
);

Presenter.propTypes = {
  parties: PropTypes.object
};

Presenter.displayName = __dirname.replace('scripts/components/', '');
export default Presenter;
