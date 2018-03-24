import { connect } from 'react-redux'
import { firebaseAuth } from 'constants/firebase'

import Presenter from './presenter'

function mapStateToProps(state) {
  return {
    authed: !!firebaseAuth().currentUser?.uid,
    currentPartyUid: state.parties.currentPartyUid,
    currentPlayerUid: state.parties.currentPlayerUid
  };
}

const Main = connect(mapStateToProps)(Presenter);
export default Main;
