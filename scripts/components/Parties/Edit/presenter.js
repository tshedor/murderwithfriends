import React from 'react'
import PropTypes from 'prop-types'

import PartyForm from '../Form'

const Presenter = ({ onEdit, narrativeId }) => <PartyForm narrativeId={narrativeId} onSubmit={onEdit} />;

Presenter.propTypes = {
  onEdit: PropTypes.func.isRequired,
  narrativeId: PropTypes.string.isRequired
};

Presenter.displayName = __dirname.replace('scripts/components/', '');
export default Presenter;
