import { connect } from 'react-redux'

import updateActorName from './actions'

import Presenter from './presenter'

function mapStateToProps(state, ownProps) {
  return {
    actorName: state.members.characters?.[ ownProps.characterId ]?.partyPlayerName,
    isOwner: state.permissions.isOwner
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSaveActorName: name => dispatch( updateActorName(name, ownProps.characterId) )
  };
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Presenter);
export default Main;
