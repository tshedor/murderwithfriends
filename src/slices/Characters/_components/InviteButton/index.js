import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Presenter from './presenter'

function mapStateToProps(state, ownProps) {
  return {
    isPartyMaster: state.permissions.isPartyMaster,
    partyPlayerId: state.members.characters[ownProps.characterId]?.partyPlayerId,
    currentPartyUid: state.parties.currentPartyUid
  };
}

const Main = connect(mapStateToProps)(Presenter);
export default Main;
