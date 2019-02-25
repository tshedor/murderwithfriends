import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { editParty } from 'actions/parties'

import Presenter from '../_components/Form'

function mapStateToProps(state, ownProps) {
  const partyId = ownProps.partyId || ownProps?.computedMatch?.params?.partyId;

  return {
    partyId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: bindActionCreators(editParty, dispatch)
  }
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Presenter);
export default Main;
