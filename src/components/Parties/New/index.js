import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import { createParty } from 'actions/parties'

import Presenter from './presenter'

function mapStateToProps(state, ownProps) {
  return {
    narrativeId: ownProps?.match?.params?.narrativeId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onCreate: bindActionCreators(createParty, dispatch)
  }
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Presenter);
export default withRouter(Main);
