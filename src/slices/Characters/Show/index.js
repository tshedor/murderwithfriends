import { graphql } from 'react-apollo'

import composeWithLoadingAndError from '+root/universal/factories/composeWithLoadingAndError'

import {
  SetCurrentPlayer as MUTATION_SET_CURRENT_PLAYER,
  GetCharacter as QUERY_CURRENT_CHARACTER
} from './remote.graphql'

import Presenter from './presenter';

const Main = composeWithLoadingAndError(
  [
    graphql(MUTATION_SET_CURRENT_PLAYER, {
      props: ({ mutate, ownProps: { match: { params: { playerId } } } }) => ({
        onMount: () => mutate({ variables: { playerId } })
      })
    }),
    graphql(QUERY_CURRENT_CHARACTER, {
      options: ({ match: { params: { playerId } } }) => ({ variables: { playerId } }),
      props: ({ ownProps: { match: { params: { playerId, partyId } } }, data: { loading, error, Player } }) => ({
        loading,
        error,
        partyId,
        playerId,
        character: Player?.character
      })
    })
  ],
  Presenter
);

export default Main;
