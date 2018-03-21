import { connect } from 'react-redux'

import { makeHasPlayerId } from 'selectors/parties'

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

const Main = connect(makeMapStateToProps)(Presenter);
export default Main;
