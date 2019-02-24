import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { firebaseAuth } from 'constants/firebase'

import { advanceRound } from 'actions/parties'

import Presenter from './presenter'

function mapStateToProps(state, ownProps) {
  return {
    isPartyMaster: state.parties.currentParty.createdBy === firebaseAuth().currentUser?.uid,
    partyPlayerId: state.parties.characters[ownProps.characterId]?.partyPlayerId,
    currentPartyUid: state.parties.currentPartyUid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAdvanceCurrentRound: bindActionCreators(advanceRound, dispatch)
  };
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Presenter);
export default Main;
