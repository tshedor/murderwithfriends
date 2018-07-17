import { graphql } from 'react-apollo'

import composeWithLoadingAndError from '+root/universal/factories/composeWithLoadingAndError'

import {
  GetPromptAnswers as QUERY_PROMPT_ANSWERS,
  UpdateAnswer as MUTATION_UPDATE_PROMPT_ANSWER
} from './remote.graphql'

import Presenter from './presenter'

const Main = composeWithLoadingAndError(
  [
    graphql(MUTATION_UPDATE_PROMPT_ANSWER, {
      props: ({ mutate, ownProps: { playerId } }) => ({
        onUpdate: variables =>
          mutate(
            {
              variables,
              optimisticResponse: {
                __typename: 'Mutation',
                updatePromptAnswer: {
                  __typename: 'PromptAnswer',
                  id: variables.promptAnswerId,
                  text: variables.text
                }
              },
              update: (proxy, { data: { updatePromptAnswer: { id, text } } }) => {
                const cacheQuery = { query: QUERY_PROMPT_ANSWERS, variables: { playerId } };
                const data = proxy.readQuery(cacheQuery);

                const newPromptAnswers = data.allPromptAnswers.map(item => {
                  if (item.id !== id) {
                    return item;
                  }

                  item.text = text

                  return item;
                });

                data.allPromptAnswers = newPromptAnswers;

                proxy.writeQuery({ ...cacheQuery, data });
              }
            }
          )
      })
    }),
    graphql(QUERY_PROMPT_ANSWERS, {
      options: ({ playerId }) => ({ variables: { playerId } }),
      props: ({ ownProps: { playerId }, data: { allPromptAnswers, loading, error } }) => ({
        loading,
        error,
        answersWithPrompts: allPromptAnswers,
        isCharacter: window.location.href.includes(playerId),
      })
    })
  ],
  Presenter
);
export default Main;
