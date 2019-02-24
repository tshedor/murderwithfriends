import { connect } from 'react-redux'

import { firebaseAuth } from 'constants/firebase'
import { updateActorName } from 'actions/characters'

import Presenter from './presenter'

function mapStateToProps(state, ownProps) {
  return {
    character: state.narratives.currentNarrative.characters?.[ ownProps.characterId ],
    actorName: state.parties.characters?.[ ownProps.characterId ]?.partyPlayerName,
    isPartyMaster: state.parties.currentParty.createdBy === firebaseAuth().currentUser?.uid,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSaveActorName: name => dispatch( updateActorName(name, ownProps.characterId) )
  };
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Presenter);
export default Main;
