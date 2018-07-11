import { graphql } from 'react-apollo'

import composeWithLoadingAndError from '+root/universal/factories/composeWithLoadingAndError'

import QUERY_SOMETHING from './remote.graphql'
import Presenter from './presenter'

const Main = graphql(QUERY_SOMETHING, {
  options: ({ variables }) => ({ variables: { } }),
  props: ({ data: { loading, error } }) => ({
    loading,
    error
  })
})(Presenter);
export default Main;
