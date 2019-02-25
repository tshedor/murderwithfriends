import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Presenter from './presenter'

function mapStateToProps(state) {
  return {
    party: state.party.current,
    isOwner: state.party.isOwner,
    clues: state.party.narrative?.clues,
  };
}

const Main = connect(mapStateToProps)(Presenter);
export default Main;
