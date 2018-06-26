import { connect } from 'react-redux'

import Presenter from './presenter'

function mapStateToProps(state, ownProps) {
  return {
    isPartyMaster: state.permissions.isPartyMaster
  };
}

const Main = connect(mapStateToProps)(Presenter);
export default Main;
