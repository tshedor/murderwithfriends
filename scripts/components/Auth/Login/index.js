import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadCurrentNarrative } from '../../../actions/narratives';

import Presenter from './presenter';

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadCurrentNarrative: bindActionCreators(loadCurrentNarrative, dispatch)
  };
}

const Main = connect(null, mapDispatchToProps)(Presenter);
export default Main;
