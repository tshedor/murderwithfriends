import { connect } from 'react-redux'

import Presenter from './presenter'

function mapStateToProps(state) {
  return {
    party: state.parties.currentParty,
    isPartyMaster: state.permissions.isPartyMaster,
    clues: state.narratives.currentNarrative.clues,
    currentPartyUid: state.parties.currentPartyUid
  };
}

const Main = connect(mapStateToProps)(Presenter);
export default Main;
