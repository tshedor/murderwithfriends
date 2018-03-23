import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { advanceRound } from 'actions/parties'

import Presenter from './presenter'

function mapStateToProps(state) {
  return {
    party: state.parties.currentParty
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAdvanceRound: bindActionCreators(advanceRound, dispatch)
  };
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Presenter);
export default Main;
