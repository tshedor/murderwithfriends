import { graphql } from 'react-apollo'
import { lifecycle } from 'recompose'

import makeComponentWithLoadingAndError from '+root/universal/factories/graphqlWithLoadingAndError'

import {
  SetCurrentPlayer as MUTATION_SET_CURRENT_PLAYER,
  GetCharacter as QUERY_CURRENT_CHARACTER
} from './remote.graphql'

import Presenter from './presenter';

const Main = makeComponentWithLoadingAndError(
  [
    graphql(MUTATION_SET_CURRENT_PLAYER, {
      props: ({ mutate, ownProps: { match: { params: { playerId } } } }) => ({
        onMount: () => mutate({ variables: { playerId } })
      })
    }),
    graphql(QUERY_CURRENT_CHARACTER, {
      options: ({ match: { params: { playerId } } }) => ({ variables: { playerId } }),
      props: ({ ownProps: { match: { params: { playerId, partyId } } }, data }) => ({
        data: {
          loading: data.loading,
          error: data.error
        },
        partyId,
        character: data.Player?.character
      })
    }),
    lifecycle({
      componentDidMount() {
        this.props.onMount();
      }
    })
  ],
  Presenter
);

export default Main;
