import { connect } from 'react-redux';

import Presenter from './presenter';

function mapStateToProps(state, ownProps) {
  return {
    characterId: state.parties.currentCharacterUid
  };
}

const Main = connect(mapStateToProps)(Presenter);
export default Main;
