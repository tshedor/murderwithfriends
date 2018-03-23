import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { editParty } from 'actions/parties'

import Presenter from './presenter'

function mapDispatchToProps(dispatch) {
  return {
    onEdit: bindActionCreators(editParty, dispatch)
  }
}

const Main = connect(null, mapDispatchToProps)(Presenter);
export default Main;
