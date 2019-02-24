import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Presenter from './presenter';

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch, ownProps) {
  return {};
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Presenter);
export default Main;
