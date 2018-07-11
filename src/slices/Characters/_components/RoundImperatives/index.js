import { graphql } from 'react-apollo'

import composeWithLoadingAndError from '+root/universal/factories/composeWithLoadingAndError'

import QUERY_ROUND from './remote.graphql'

import Presenter from './presenter'

const Main = composeWithLoadingAndError(
  graphql(QUERY_ROUND, {
    options: ({ roundId, characterId }) => ({ variables: { roundId, characterId } }),
    props: ({ data: { loading, error, round } }) => ({
      loading,
      error,
      round
    })
  }),
  Presenter
);

export default Main;
