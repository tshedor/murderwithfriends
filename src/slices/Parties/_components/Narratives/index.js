import { connect } from 'react-redux';

import Presenter from './presenter';

function mapStateToProps(state) {
  console.log(state.narratives.previews);
  return {
    narratives: state.narratives.previews
  };
}

const Main = connect(mapStateToProps)(Presenter);
export default Main;
