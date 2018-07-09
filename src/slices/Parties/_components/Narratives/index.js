import { graphql } from 'react-apollo'

import makeComponentWithLoadingAndError from '+root/universal/factories/graphqlWithLoadingAndError'
import QUERY_NARRATIVE_PREVIEWS from './remote.graphql'

import Presenter from './presenter'

const Main = makeComponentWithLoadingAndError(
  graphql(QUERY_NARRATIVE_PREVIEWS),
  Presenter
);

export default Main;
