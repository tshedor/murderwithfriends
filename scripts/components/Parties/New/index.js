import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import { createParty } from 'actions/parties'

import Presenter from './presenter'

function mapDispatchToProps(dispatch) {
  return {
    onCreate: bindActionCreators(createParty, dispatch)
  }
}

const Main = connect(null, mapDispatchToProps)(Presenter);
export default withRouter(Main);
