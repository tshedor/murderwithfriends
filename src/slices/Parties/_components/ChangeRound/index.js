import { graphql, compose } from 'react-apollo'

import {
  NarrativeProps as QUERY_NARRATIVE_PROPS,
  PreviousRound as MUTATION_PREVIOUS_ROUND,
  NextRound as MUTATION_NEXT_ROUND,
  CurrentRound as QUERY_CURRENT_ROUND
} from './remote.graphql'

import Presenter from './presenter'

const options = ({ partyId }) => ({
  variables: { partyId }
});

const narrativeQueryProps = ({ ownProps, data: { loading, error, Party } }) => ({
  data: {
    loading,
    error
  },
  postscript: Party?.narrative?.postscript,
  rounds: Party?.narrative?.rounds.length - 1
});

const makeMutateProps = (functionName) => ({ ownProps, mutate }) => ({
  [functionName]: () => {
    return mutate({ variables: { partyId: ownProps.partyId } })
      .then(ownProps.refetchCurrentRound)
  }
});

const currentRoundProps = ({ data: { loading, Party, refetch } }) => ({
  loading,
  currentRound: Party?.currentRound,
  refetchCurrentRound: refetch
});

const Main = compose(
  graphql(QUERY_NARRATIVE_PROPS, {
    options,
    props: narrativeQueryProps
  }),
  graphql(QUERY_CURRENT_ROUND, {
    options,
    props: currentRoundProps
  }),
  graphql(MUTATION_PREVIOUS_ROUND, {
    props: makeMutateProps('onPrevious')
  }),
  graphql(MUTATION_NEXT_ROUND, {
    props: makeMutateProps('onNext')
  })
)(Presenter);
export default Main;
