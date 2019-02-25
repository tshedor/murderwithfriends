import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { firebaseAuth } from 'constants/firebase'

import { load } from 'actions/parties'

import Presenter from './routes'

function mapStateToProps(state, ownProps) {
  return {
    partyId: ownProps?.match?.params?.partyId,
    isOwner: state.party.isOwner,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onMount: () => dispatch( load(ownProps?.match?.params?.partyId) )
  };
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Presenter);
export default Main;
