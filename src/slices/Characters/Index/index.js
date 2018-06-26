import { connect } from 'react-redux';

import Presenter from './presenter'

function mapStateToProps(state, ownProps) {
  return {
    characters: state.narratives.currentNarrative.characters
  };
}

const Main = connect(mapStateToProps)(Presenter);
export default Main;
