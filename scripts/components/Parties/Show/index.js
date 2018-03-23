import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { advanceRound } from 'actions/parties'

import Presenter from './presenter'

function mapStateToProps(state) {
  return {
    party: state.parties.currentParty,
    isPartyMaster: true,
    currentRound: state.parties.currentRound,
    clues: state.narratives.currentNarrative.clues,
    characters: state.narratives.currentNarrative.characters,
    partyCharacters: state.parties.characters,
    currentPartyUid: state.parties.currentPartyUid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAdvanceRound: bindActionCreators(advanceRound, dispatch)
  };
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Presenter);
export default Main;
