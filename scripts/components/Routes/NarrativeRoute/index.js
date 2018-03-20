import { connect } from 'react-redux';

import { hasNarrative } from 'selectors/narratives';

import Presenter from './presenter';

function mapStateToProps(state, ownProps) {
  return {
    hasNarrative: hasNarrative(state),
    narrativesAreLoading: state.narratives.isLoading,
    creatingNarrative: state.narratives.creatingNarrative
  }
}

const Main = connect(mapStateToProps)(Presenter);
export default Main;
