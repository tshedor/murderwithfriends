import { connect } from 'react-redux';

import Presenter from './presenter';

function mapStateToProps(state) {
  return {
    currentRoundId: state.parties.currentRound
  };
}

const Main = connect(mapStateToProps)(Presenter);
export default Main;
