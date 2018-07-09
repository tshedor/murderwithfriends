import { graphql } from 'react-apollo'

import makeComponentWithLoadingAndError from '+root/universal/factories/graphqlWithLoadingAndError'

import QUERY_ROUND from './remote.graphql'

import Presenter from './presenter'

const Main = makeComponentWithLoadingAndError(
  graphql(QUERY_ROUND, {
    options: ({ roundId, characterId }) => ({ variables: { roundId, characterId } }),
    props: ({ data: { loading, error, round } }) => ({
      data: {
        loading,
        error
      },
      round
    })
  }),
  Presenter
);

export default Main;
