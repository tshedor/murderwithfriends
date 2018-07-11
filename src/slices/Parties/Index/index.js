import { graphql } from 'react-apollo'

import QUERY_ALL_PARTIES from './remote.graphql'

import composeWithLoadingAndError from '+root/universal/factories/composeWithLoadingAndError'

import Presenter from './presenter'

const Main = composeWithLoadingAndError(
  graphql(QUERY_ALL_PARTIES),
  Presenter
);

export default Main;
