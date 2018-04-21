import { connect } from 'react-redux';

import Presenter from './presenter';

function mapStateToProps(state, ownProps) {
  return {
    characterId: state.parties.currentCharacterUid,
    displayName: state.narratives.currentNarrative.characters?.[ state.parties.currentCharacterUid ]?.displayName,
    currentPartyUid: state.parties.currentPartyUid
  };
}

const Main = connect(mapStateToProps)(Presenter);
export default Main;
