import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import { createParty } from 'actions/parties'

import Presenter from '../_components/Form'

function mapStateToProps(state, ownProps) {
  return {
    narrativeId: ownProps?.match?.params?.narrativeId
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSubmit: props => {
      dispatch( createParty(props) );
      ownProps.history.push('/parties');
    }
  }
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Presenter);
export default withRouter(Main);
