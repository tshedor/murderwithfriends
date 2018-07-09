import { graphql } from 'react-apollo'

import makeComponentWithLoadingAndError from '+root/universal/factories/graphqlWithLoadingAndError'

import QUERY_ALL_CHARACTERS from './remote.graphql'

import Presenter from './presenter'

const Main = makeComponentWithLoadingAndError(
  graphql(QUERY_ALL_CHARACTERS, {
    options: ({ match: { params: { partyId } } }) => ({ variables: { partyId } }),
    props: ({ data: { loading, error, allCharacters } }) => ({
      data: {
        loading,
        error
      },
      characters: allCharacters
    })
  }),
  Presenter
);

export default Main;
