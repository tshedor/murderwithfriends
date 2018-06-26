import { connect } from 'react-redux'

import Presenter from './presenter'

import { availableNarrativeRounds } from './selectors'

function mapStateToProps(state) {
  return {
    rounds: availableNarrativeRounds(state)
  };
}

const Main = connect(mapStateToProps)(Presenter);
export default Main;
