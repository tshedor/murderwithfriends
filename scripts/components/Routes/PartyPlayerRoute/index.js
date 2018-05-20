import { connect } from 'react-redux'

import { makeHasPlayerId } from 'selectors/parties'
import { load } from 'actions/parties'
import { setCurrentPartyPlayer } from 'actions/characters'

import Presenter from './presenter'

const makeMapStateToProps = () => {
  const hasPlayerId = makeHasPlayerId();

  const mapStateToProps = (state, ownProps) => {
    return {
      isPlayerInParty: hasPlayerId(state, ownProps),
      parties: state.parties.all,
      currentParty: state.parties.currentParty
    };
  };

  return mapStateToProps;
};

function mapDispatchToProps(dispatch, ownProps) {
  const partyId = ownProps?.computedMatch?.params?.partyId;
  const playerId = ownProps?.computedMatch?.params?.playerId;
  
  return {
    onSetCurrentParty: () => dispatch( load( partyId, playerId ) )
  };
}

const Main = connect(makeMapStateToProps, mapDispatchToProps)(Presenter);
export default Main;
