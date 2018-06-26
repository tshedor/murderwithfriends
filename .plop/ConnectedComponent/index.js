import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import Presenter from './presenter'

function mapStateToProps(state, ownProps) {
  return {
{{#each props}}
    {{this.name}}: state.
{{/each}}
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {

  };
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Presenter);
export default Main;
