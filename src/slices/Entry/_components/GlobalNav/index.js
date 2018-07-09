import { graphql, compose } from 'react-apollo'
import { onlyUpdateForKeys } from 'recompose'

import QUERY_CURRENT_PARTY_AND_PLAYER from './remote.graphql'

import Presenter from './presenter'

const Main = compose(
  graphql(QUERY_CURRENT_PARTY_AND_PLAYER, {
    props: ({ data }) => ({
      currentPartyId: data.currentParty?.id,
      currentPlayerId: data.currentPlayer?.id
    })
  }),
  onlyUpdateForKeys(['currentPartyId', 'currentPlayerId'])
)(Presenter);

export default Main;
