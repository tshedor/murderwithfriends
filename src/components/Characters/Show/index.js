import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setCurrentPartyPlayer } from 'actions/characters';

import Presenter from './presenter';

function mapStateToProps(state, ownProps) {
  return {
    parties: state.parties.all,
    characterId: state.parties.currentCharacterUid,
    currentPlayerUid: state.parties.currentPlayerUid,
    displayName: state.narratives.currentNarrative.characters?.[ state.parties.currentCharacterUid ]?.displayName,
    currentPartyUid: state.parties.currentPartyUid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onFindCharacterId: bindActionCreators(setCurrentPartyPlayer, dispatch)
  };
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Presenter);
export default Main;
