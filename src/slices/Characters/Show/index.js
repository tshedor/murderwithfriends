import { setCurrentPartyPlayer } from 'actions/characters'

import Presenter from './presenter';

function mapStateToProps(state, ownProps) {
  const playerId = ownProps?.match?.params?.playerId;

  return {
    partyId: state.party.id,
    playerId,
    character: state.party.characters[ state.party.players?.[playerId]?.characterId ]
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const playerId = ownProps?.match?.params?.playerId;

  return {
    onMount: () => dispatch( setCurrentPartyPlayer(playerId) )
  };
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Presenter);
export default Main;
