import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import editParty from './actions'

import Presenter from '../_components/Form';

function mapStateToProps(state, ownProps) {
  return {
    narrativeId: ownProps.narrativeId || ownProps?.computedMatch?.params?.narrativeId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: bindActionCreators(editParty, dispatch)
  }
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Presenter);
export default Main;
