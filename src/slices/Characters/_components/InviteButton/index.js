import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { firebaseAuth } from 'constants/firebase'

import Presenter from './presenter'

function mapStateToProps(state, ownProps) {
  return {
    isOwner: state.party.isOwner,
    playerId: state.party.characters[ownProps.characterId]?.partyPlayerId,
    partyId: state.party.current
  };
}

const Main = connect(mapStateToProps)(Presenter);
export default Main;
