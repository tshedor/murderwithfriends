import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { advanceRound } from 'actions/parties'

import Presenter from './presenter'

function mapStateToProps(state) {
  return {
    currentRound: state.parties.currentRound,
    totalRounds: state.narratives.currentNarrative.totalRounds,
    postscript: state.narratives.currentNarrative.postscript
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAdvanceCurrentRound: bindActionCreators(advanceRound, dispatch)
  };
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Presenter);
export default Main;
