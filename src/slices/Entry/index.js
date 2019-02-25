import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { initializeListeners } from 'actions/auth'

import Presenter from './presenter'

function mapDispatchToProps(dispatch) {
  return {
    onMount: bindActionCreators(initializeListeners, dispatch)
  };
}

const Main = connect(null, mapDispatchToProps)(Presenter);
export default Main;
