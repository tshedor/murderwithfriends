import { graphql } from 'react-apollo'

import {
  SetCurrentParty as MUTATION_SET_CURRENT_PARTY
} from './remote.graphql'

import Presenter from './routes'

const Main = graphql(MUTATION_SET_CURRENT_PARTY, {
  props: ({ mutate, ownProps: { match: { params: { partyId } } } }) => ({
    onMount: () => mutate({ variables: { partyId } })
  })
})(Presenter);

export default Main;
