import MUTATION_UPDATE_PARTY from './remote.graphql'
import { graphql } from 'react-apollo'

import Presenter from '../_components/Form'

const Main = graphql(MUTATION_UPDATE_PARTY, {
  props: ({ mutate, ownProps }) => {
    const partyId = ownProps.partyId || ownProps?.computedMatch?.params?.partyId;

    return {
      partyId,
      onSubmit: props => mutate({ variables: { ...props, partyId } })
    }
  }
})(Presenter);

export default Main;
