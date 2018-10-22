import { graphql } from 'react-apollo'

import composeWithLoadingAndError from '+root/universal/factories/composeWithLoadingAndError'

import {
  CurrentRound as SUBSCRIPTION_CURRENT_ROUND,
  GetRounds as QUERY_ROUNDS
} from './remote.graphql'

import Presenter from './presenter'

const Main = composeWithLoadingAndError(
  [
    graphql(SUBSCRIPTION_CURRENT_ROUND, {
      options: ({ partyId }) => ({ variables: { partyId } }),
      props: ({ data }) => ({
        currentRound: data.Party?.currentRound,
      })
    }),
    graphql(QUERY_ROUNDS, {
      options: ({ partyId, currentRound, characterId }) => ({
        variables: {
          partyId,
          characterId,
          currentRound
        }
      }),
      props: ({ ownProps, data: { loading, error, allRounds } }) => ({
        loading,
        error,
        allRounds
      })
    }),
  ],
  Presenter
);

export default Main;
