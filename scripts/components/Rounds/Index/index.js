import { connect } from 'react-redux'

import Presenter from './presenter'

import { availableNarrativeRounds } from 'selectors/rounds'

function mapStateToProps(state) {
  return {
    partyRounds: state.parties.rounds,
    narrativeRounds: availableNarrativeRounds(state)
  };
}

const Main = connect(mapStateToProps)(Presenter);
export default Main;
