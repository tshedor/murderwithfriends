import { connect } from 'react-redux';

import { firebaseAuth } from '../../constants/firebase';

import Presenter from './presenter';

function mapStateToProps(state) {
  return {
    hasPremium: state.billing.hasPremium
  };
}

const Main = connect(mapStateToProps)(Presenter);
export default Main;
