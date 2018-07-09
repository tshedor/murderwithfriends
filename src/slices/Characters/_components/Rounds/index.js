import { graphql } from 'react-apollo'

import makeComponentWithLoadingAndError from '+root/universal/factories/graphqlWithLoadingAndError'

import {
  CurrentRound as SUBSCRIPTION_CURRENT_ROUND,
  GetRounds as QUERY_ROUNDS
} from './remote.graphql'

import Presenter from './presenter'

const Main = makeComponentWithLoadingAndError(
  [
    graphql(SUBSCRIPTION_CURRENT_ROUND, {
      options: ({ partyId }) => ({ variables: { partyId } }),
      props: ({ data: { Party } }) => ({
        currentRound: Party?.currentRound,
      })
    }),
    graphql(QUERY_ROUNDS, {
      options: ({ partyId, currentRound }) => ({
        variables: {
          partyId,
          currentRound
        }
      }),
      props: ({ ownProps, data: { loading, error, allRounds } }) => {
        return {
          data: {
            loading,
            error
          },
          rounds: allRounds.map(r => r.id)
        };
      }
    }),
  ],
  Presenter
);

export default Main;
