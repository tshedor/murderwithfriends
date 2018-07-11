import { graphql } from 'react-apollo'

import composeWithLoadingAndError from '+root/universal/factories/composeWithLoadingAndError'

import QUERY_ALL_CHARACTERS from './remote.graphql'

import Presenter from './presenter'

const Main = composeWithLoadingAndError(
  graphql(QUERY_ALL_CHARACTERS, {
    options: ({ match: { params: { partyId } } }) => ({ variables: { partyId } }),
    props: ({ data: { loading, error, allPlayers } }) => ({
      loading,
      error,
      players: allPlayers
    })
  }),
  Presenter
);

export default Main;
