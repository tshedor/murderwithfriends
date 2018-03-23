import { connect } from 'react-redux'

import { makeHasPlayerId } from 'selectors/parties'
import { load, setCurrentPartyPlayer } from 'actions/parties'

import Presenter from './presenter'

const makeMapStateToProps = () => {
  const hasPlayerId = makeHasPlayerId();

  const mapStateToProps = (state, ownProps) => {
    return {
      isPlayerInParty: hasPlayerId(state, ownProps)
    };
  };

  return mapStateToProps;
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSetCurrentParty: () => dispatch( load( ownProps?.computedMatch?.params?.partyId ) ),
    onSetCurrentPartyPlayer: () => dispatch( setCurrentPartyPlayer( ownProps?.computedMatch?.params?.partyId, ownProps?.computedMatch?.params?.playerId ) )
  };
}

const Main = connect(makeMapStateToProps, mapDispatchToProps)(Presenter);
export default Main;
