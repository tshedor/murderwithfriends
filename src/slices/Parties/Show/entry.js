import { graphql, compose } from 'react-apollo'

import {
  SetCurrentParty as MUTATION_SET_CURRENT_PARTY,
  GetIsPartyOwner as QUERY_IS_PARTY_OWNER,
  SetIsPartyOwner as MUTATION_SET_IS_PARTY_OWNER
} from './remote.graphql'

import Presenter from './routes'

const Main = compose(
  graphql(QUERY_IS_PARTY_OWNER, {
    options: ({ match: { params: { partyId } } }) => ({ variables: { partyId } }),
    props: ({ ownProps, data }) => ({
      isOwner: data?.isPartyOwner?.isOwner,
      partyId: ownProps?.match?.params?.partyId
    })
  }),
  graphql(MUTATION_SET_CURRENT_PARTY, {
    options: ({ partyId }) => ({ variables: { partyId } }),
    props: ({ mutate, ownProps: { partyId } }) => ({
      onMount: () => mutate({ variables: { partyId, isOwner: false } }),
      onOwnerChecked: (isOwner = false) => mutate({ variables: { partyId, isOwner }})
    })
  })
)(Presenter);

export default Main;
