import { connect } from 'react-redux';

import Presenter from './presenter';

function mapStateToProps(state) {
  return {
    parties: state.parties.all
  };
}

const Main = connect(mapStateToProps)(Presenter);
export default Main;
