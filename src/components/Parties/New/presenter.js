import React from 'react'
import PropTypes from 'prop-types'

import PartyForm from '../Form'

const Presenter = ({ onCreate, narrativeId, history }) => <PartyForm history={history} narrativeId={narrativeId} onSubmit={onCreate} />;

Presenter.propTypes = {
  onCreate: PropTypes.func.isRequired,
  narrativeId: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
};

Presenter.displayName = __dirname.replace('src/components/', '');
export default Presenter;
