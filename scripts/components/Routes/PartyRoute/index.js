import { connect } from 'react-redux'

import { makeHasParty } from 'selectors/parties'

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

const Main = connect(makeMapStateToProps)(Presenter);
export default Main;
