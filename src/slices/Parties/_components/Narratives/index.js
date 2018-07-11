import { graphql } from 'react-apollo'

import composeWithLoadingAndError from '+root/universal/factories/composeWithLoadingAndError'
import QUERY_NARRATIVE_PREVIEWS from './remote.graphql'

import Presenter from './presenter'

const Main = composeWithLoadingAndError(
  graphql(QUERY_NARRATIVE_PREVIEWS),
  Presenter
);

export default Main;
