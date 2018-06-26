import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import createParty from './actions'

import Presenter from '../_components/Form';

function mapStateToProps(state, ownProps) {
  return {
    narrativeId: ownProps?.match?.params?.narrativeId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: bindActionCreators(createParty, dispatch)
  }
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Presenter);
export default Main;
