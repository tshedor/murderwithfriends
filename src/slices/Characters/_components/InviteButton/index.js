import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { firebaseAuth } from 'constants/firebase'

import Presenter from './presenter'

function mapStateToProps(state, ownProps) {
  return {
    isOwner: state.party.isOwner,
    partyId: state.party.id
  };
}

const Main = connect(mapStateToProps)(Presenter);
export default Main;
