import { graphql, compose } from 'react-apollo'
import { onlyUpdateForKeys } from 'recompose'

import QUERY_CURRENT_PARTY_AND_PLAYER from './remote.graphql'

import Presenter from './presenter'

const Main = compose(
  graphql(QUERY_CURRENT_PARTY_AND_PLAYER, {
    props: ({ data, ownProps: { playerId } }) => ({
      isOwner: true,
      partyId: data.currentParty?.id,
      playerId
    })
  }),
  onlyUpdateForKeys(['partyId', 'playerId'])
)(Presenter);

export default Main;
