import { graphql, compose } from 'react-apollo'

import {
  CreateParty as MUTATION_CREATE_PARTY,
  BuildRelationsForParty as MUTATION_BUILD_PARTY
} from './remote.graphql'

import Presenter from '../_components/Form'

const Main = compose(
  graphql(MUTATION_BUILD_PARTY, {
    props: ({ mutate }) => ({
      onBuildParty: id => mutate({ variables: { id } })
    })
  }),
  graphql(MUTATION_CREATE_PARTY, {
    props: ({ mutate, ownProps }) => ({
      narrativeId: ownProps?.match?.params?.narrativeId,
      onSubmit: props => mutate({ variables: { ...props, narrativeId } }).then(data => this.props.onBuildParty(data.createParty.id))
    })
  })
)(Presenter);
export default Main;
