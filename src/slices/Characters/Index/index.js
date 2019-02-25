import { connect } from 'react-redux';

import Presenter from './presenter';

function mapStateToProps(state, ownProps) {
  return {
    characters: state.party.characters,
    players: state.party.players
  };
}

const Main = connect(mapStateToProps)(Presenter);
export default Main;
