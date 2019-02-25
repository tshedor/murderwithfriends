import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Presenter from './presenter';

import { saveCharacterPrompt } from 'actions/characters'

function mapStateToProps(state, ownProps) {
  return {
    prompts: state.party.characters[ ownProps.characterId ].prompts,
    answers: state.party.players[ ownProps.characterId ].promptAnswers,
    isCharacter: state.party.characterId === ownProps.characterId
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onUpdate: bindActionCreators(saveCharacterPrompt, dispatch)
  };
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Presenter);
export default Main;
