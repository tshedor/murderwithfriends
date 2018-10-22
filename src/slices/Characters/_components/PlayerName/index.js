import { graphql, compose } from 'react-apollo'

import {
  UpdateDisplayName as MUTATION_UPDATE_DISPLAY_NAME,
  GetDisplayName as QUERY_DISPLAY_NAME,
  GetIsOwner as QUERY_IS_OWNER
} from './remote.graphql'

import Presenter from './presenter'

const Main = compose(
  graphql(QUERY_DISPLAY_NAME, {
    options: ({ playerId }) => ({ variables: { playerId } }),
    props: ({ data: { Player } }) => ({
      displayName: Player?.displayName
    })
  }),
  graphql(QUERY_IS_OWNER, {
    props: ({ data }) => ({
      isOwner: data.currentParty?.isOwner
    })
  }),
  graphql(MUTATION_UPDATE_DISPLAY_NAME, {
    props: ({ mutate, ownProps: { isOwner, playerId } }) => ({
      onUpdate: displayName => mutate({ variables: { playerId, displayName } })
    })
  })
)(Presenter)

export default Main;
