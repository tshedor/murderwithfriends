import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Icon from 'components/Modules/Icon'

const Presenter = ({ isPartyMaster, currentPartyUid, partyPlayerId }) => {
  if (!isPartyMaster || !partyPlayerId) return null;

  return (
    <Link to={`/parties/${currentPartyUid}/${partyPlayerId}`} className="button">
      <Icon name="link" /> Player Link
      <em>Copy & send this link to your actor</em>
    </Link>
  );
};

Presenter.propTypes = {
  isPartyMaster: PropTypes.bool,
  currentPartyUid: PropTypes.string,
  partyPlayerId: PropTypes.string,
  characterId: PropTypes.string.isRequired
};

export default Presenter;
