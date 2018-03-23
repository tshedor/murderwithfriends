import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

const Presenter = ({parties}) => (
  <div className="parties">
    {Object.keys(parties).map(key =>
      <Link to={`/parties/${key}`} key={key}>{parties[key].displayName}</Link>
    )}
  </div>
);

Presenter.propTypes = {
  parties: PropTypes.object
};

Presenter.displayName = __dirname.replace('scripts/components/', '');
export default Presenter;
