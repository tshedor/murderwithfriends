import React from 'react'
import PropTypes from 'prop-types'

import PartyForm from '../Form'

const Presenter = ({ onEdit, narrativeId, ...otherProps }) => <PartyForm narrativeId={narrativeId} onSubmit={onEdit} {...otherProps} />;

Presenter.propTypes = {
  onEdit: PropTypes.func.isRequired,
  narrativeId: PropTypes.string.isRequired
};

Presenter.displayName = __dirname.replace('src/components/', '');
export default Presenter;
