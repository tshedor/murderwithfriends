import { connect } from 'react-redux';

import { clearNotice } from 'actions/ux';

import Presenter from './presenter';

function mapStateToProps(state) {
  return {
    notice: state.ux.notice
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onDismiss: () => dispatch( clearNotice() )
  }
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Presenter);
export default Main;
