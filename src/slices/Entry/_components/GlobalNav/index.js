import { graphql, compose } from 'react-apollo'
import { onlyUpdateForKeys } from 'recompose'

import {
  GetCurrentForGlobalNav as QUERY_CURRENT_PARTY_AND_PLAYER,
  IsUserLoggedIn as QUERY_IS_LOGGED_IN
} from './remote.graphql'

import Presenter from './presenter'

const Main = compose(
  graphql(QUERY_CURRENT_PARTY_AND_PLAYER, {
    props: ({ data }) => ({
      currentPartyId: data.currentParty?.id,
      currentPlayerId: data.currentPlayer?.id
    })
  }),
  graphql(QUERY_IS_LOGGED_IN, {
    props: ({ data }) => ({
      authed: !!data.loggedInUser?.id,
      isOwner: false
    })
  }),
  onlyUpdateForKeys(['currentPartyId', 'currentPlayerId', 'authed'])
)(Presenter);

export default Main;
