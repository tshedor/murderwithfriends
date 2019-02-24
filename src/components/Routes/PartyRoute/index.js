import { connect } from 'react-redux'

import { makeHasParty } from 'selectors/parties'
import { load } from 'actions/parties'

import Presenter from './presenter'

const makeMapStateToProps = () => {
  const hasParty = makeHasParty();

  const mapStateToProps = (state, ownProps) => {
    return {
      hasParty: hasParty(state, ownProps)
    };
  };

  return mapStateToProps;
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSetCurrentParty: () => dispatch( load( ownProps?.computedMatch?.params?.partyId ) ),
  };
}

const Main = connect(makeMapStateToProps, mapDispatchToProps)(Presenter);
export default Main;
