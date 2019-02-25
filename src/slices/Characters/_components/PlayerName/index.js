import { connect } from 'react-redux'

import { firebaseAuth } from 'constants/firebase'
import { updateActorName } from 'actions/characters'

import Presenter from './presenter'

function mapStateToProps(state, ownProps) {
  return {
    character: state.party.characters[ state.party.players?.[ ownProps.playerId ] ],
    displayName: state.party.players?.[ ownProps.playerId ]?.displayName,
    isOwner: state.party.isOwner,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onUpdate: name => dispatch( updateActorName(name, ownProps.playerId) )
  };
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Presenter);
export default Main;

