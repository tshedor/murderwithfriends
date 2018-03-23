import { connect } from 'react-redux';

import Presenter from './presenter';

function mapStateToProps(state, ownProps) {
  return {
    character: state.narratives.currentNarrative.characters?.[ ownProps.characterId ]
  };
}

const Main = connect(mapStateToProps)(Presenter);
export default Main;
