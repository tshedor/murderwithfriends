import { graphql } from 'react-apollo'

import QUERY_ALL_PARTIES from './remote.graphql'

import makeComponentWithLoadingAndError from '+root/universal/factories/graphqlWithLoadingAndError'

import Presenter from './presenter'

const Main = makeComponentWithLoadingAndError(
  graphql(QUERY_ALL_PARTIES),
  Presenter
);

export default Main;
