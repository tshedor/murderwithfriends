import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';

import Presenter from './presenter';

const getCurrentNarrativeCharacters = state => state.narratives.currentNarrative.characters;
const getCurrentCharacterId = state => state.members.currentCharacterUid;

const findCurrentCharacter = createSelector(
  getCurrentNarrativeCharacters,
  getCurrentCharacterId,
  (characters, characterId) => {
    return characters?.[characterId];
  }
);

function mapStateToProps(state) {
  return {
    parties: state.parties.all,
    character: findCurrentCharacter(state),
    currentPlayerUid: state.members.currentPlayerUid,
    currentCharacterUid: state.members.currentCharacterUid,
    currentPartyUid: state.parties.currentPartyUid
  };
}

const Main = connect(mapStateToProps)(Presenter);
export default Main;
