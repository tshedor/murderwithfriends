import { graphql } from 'react-apollo'

import composeWithLoadingAndError from '+root/universal/factories/composeWithLoadingAndError'

import {
  CurrentRound as SUBSCRIPTION_CURRENT_ROUND,
  GetCharacter as QUERY_CHARACTER
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
    graphql(QUERY_CHARACTER, {
      options: ({ partyId, currentRound, characterId }) => ({
        variables: {
          characterId
        }
      }),
      props: ({ ownProps, data: { loading, error, Character } }) => ({
        loading,
        error,
        displayName: Character?.displayName
      })
    }),
  ],
  Presenter
);

export default Main;
