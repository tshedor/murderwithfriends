import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { nextRound, previousRound } from 'actions/parties'

import Presenter from './presenter'

function mapStateToProps(state) {
  return {
    currentRound: state.party.round,
    totalRounds: state.party.narrative.totalRounds,
    postscript: state.party.narrative.postscript
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onNext: bindActionCreators(nextRound, dispatch),
    onPrevious: bindActionCreators(previousRound, dispatch)
  };
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Presenter);
export default Main;
