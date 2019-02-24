import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Presenter from './presenter';

import { saveCharacterPrompt } from 'actions/characters'

function mapStateToProps(state, ownProps) {
  return {
    prompts: state.narratives.currentNarrative.characters[ ownProps.characterId ].prompts,
    answers: state.parties.characters[ ownProps.characterId ].promptAnswers,
    isCharacter: state.parties.currentCharacterUid === ownProps.characterId
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSavePrompt: bindActionCreators(saveCharacterPrompt, dispatch)
  };
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Presenter);
export default Main;
