import { connect } from 'react-redux'
import { firebaseAuth } from 'constants/firebase'

import Presenter from './presenter'

function mapStateToProps(state) {
  return {
    authed: !!firebaseAuth().currentUser?.uid,
    currentPartyId: state.party.id,
    currentPlayerId: state.party.playerId
  };
}

const Main = connect(mapStateToProps)(Presenter);
export default Main;
