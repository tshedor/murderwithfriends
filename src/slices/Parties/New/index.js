import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'

import {
  CreateParty as MUTATION_CREATE_PARTY,
  BuildRelationsForParty as MUTATION_BUILD_PARTY
} from './remote.graphql'

import Presenter from '../_components/Form'

const Main = compose(
  graphql(MUTATION_BUILD_PARTY, {
    props: ({ mutate, ownProps }) => ({
      onBuildParty: partyId => {
        return mutate({ variables: { partyId } }).then(({ data }) =>
          ownProps.history.push(`/parties/${data.buildRelationsForParty.id}`)
        )
      }
    })
  }),
  graphql(MUTATION_CREATE_PARTY, {
    props: ({ mutate, ownProps }) => {
      return {
        narrativeId: ownProps?.match?.params?.narrativeId,
        onSubmit: variables => mutate({ variables }).then(({ data }) => ownProps.onBuildParty(data?.createParty.id))
      }
    }
  })
)(withRouter(Presenter));
export default Main;
