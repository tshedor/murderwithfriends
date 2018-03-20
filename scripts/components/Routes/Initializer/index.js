import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initializeListeners } from 'actions/auth';

import Presenter from './presenter';

function mapStateToProps(state) {
  return {
    isLoading: state.narratives.isLoading
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onInitializeListeners: bindActionCreators(initializeListeners, dispatch)
  };
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Presenter);
export default Main;
