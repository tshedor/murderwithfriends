import { connect } from 'react-redux'

import Presenter from './presenter'

import { availableNarrativeRounds } from 'selectors/rounds'

function mapStateToProps(state) {
  return {
    availableRounds: availableNarrativeRounds(state),
    characterId: state.party.characterId,
    currentRound: state.party.round,
    partyId: state.party.id
  };
}

const Main = connect(mapStateToProps)(Presenter);
export default Main;
