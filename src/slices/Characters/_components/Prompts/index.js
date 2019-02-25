import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Presenter from './presenter';

import { saveCharacterPrompt } from 'actions/characters'

function mapStateToProps(state, ownProps) {
  const characterId = state.party.players[ ownProps.playerId ]?.characterId;

  return {
    prompts: state.party.characters[ characterId ]?.prompts,
    answers: state.party.players[ ownProps.playerId ]?.promptAnswers,
    isCharacter: state.party.playerId === ownProps.playerId
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onUpdate: bindActionCreators(saveCharacterPrompt, dispatch)
  };
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Presenter);
export default Main;
