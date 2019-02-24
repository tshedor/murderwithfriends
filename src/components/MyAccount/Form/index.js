import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { firebaseAuth } from 'constants/firebase';

import { setNotice } from 'actions/ux';

import Presenter from './presenter';

function mapStateToProps(state) {
  return {
    user: firebaseAuth().currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSetNotice: msg => dispatch( setNotice({msg: msg}) )
  };
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Presenter);
export default withRouter(Main);
