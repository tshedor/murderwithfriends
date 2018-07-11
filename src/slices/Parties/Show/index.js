import { graphql } from 'react-apollo'
import memoized from 'fast-memoize'

import {
  GetParty as QUERY_PARTY,
  SetCurrentParty as MUTATION_SET_CURRENT_PARTY
} from './remote.graphql'

import composeWithLoadingAndError from '+root/universal/factories/composeWithLoadingAndError'

import Presenter from './presenter'

const flatten = (arr, val) => arr.concat(val);

const flattenRoundClues = memoized((round) => {
  const { characterRounds, order } = round;

  const clues = characterRounds
    .map(characterRound => characterRound.clues)
    .reduce(flatten, [])

  return clues.map(clue => {
    return { id: clue.id, hint: clue.hint, roundNumber: order };
  });
});

const pullCluesFromRounds = memoized((rounds) =>
  rounds
    .filter(({ characterRounds }) => characterRounds.length > 0)
    .map(flattenRoundClues)
    .reduce(flatten, [])
);

const Main = composeWithLoadingAndError(
  graphql(QUERY_PARTY, {
    options: ({ match: { params: { partyId } } }) => ({ variables: { partyId } }),
    props: ({ ownProps, data }) => {
      // TODO is this the place to normalize the response?
      //   Normalizing here doesn't trigger rerender of the component
      //   And....I really don't understand why I'd want to manipulate
      //   the Apollo cache, which feels like the place to normalize if anywhere
      const { loading, error, Party, allRounds } = data;

      const resp = {
        loading,
        error,
        isOwner: true
      };

      if (!Party || !allRounds) {
        return resp;
      }

      // Let's not be lazy and trust weird functions
      // will never be passed through from Apollo
      const { displayName, id, location, otherNotes, text, time } = Party;
      const clues = pullCluesFromRounds(allRounds);

      return {
        ...resp,
        clues,
        party: {
          displayName,
          id,
          location,
          otherNotes,
          text,
          time
        }
      };
    }
  }),
  Presenter
);

export default Main;
