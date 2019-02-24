import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { editParty } from 'actions/parties'

import Presenter from './presenter'

function mapStateToProps(state, ownProps) {
  return {
    narrativeId: ownProps.narrativeId || ownProps?.computedMatch?.params?.narrativeId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onEdit: bindActionCreators(editParty, dispatch)
  }
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Presenter);
export default Main;
