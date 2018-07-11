import { graphql } from 'react-apollo'

import composeWithLoadingAndError from '+root/universal/factories/composeWithLoadingAndError'

import {
  GetPrompts as QUERY_PROMPTS,
  GetPromptAnswers as QUERY_PROMPT_ANSWERS,
  CreateAnswer as MUTATION_CREATE_PROMPT_ANSWER,
  UpdateAnswer as MUTATION_UPDATE_PROMPT_ANSWER
} from './remote.graphql'

import Presenter from './presenter'

const convertToObject = (arraysWithIdAndData=[], propContainingId) => {
  return arraysWithIdAndData.reduce((obj, item) => {
    const id = propContainingId ? item[propContainingId].id : item.id;
    obj[id] = item;
    return obj;
  }, {});
}

const Main = composeWithLoadingAndError(
  [
    graphql(MUTATION_UPDATE_PROMPT_ANSWER, {
      props: ({ mutate }) => ({
        onUpdate: variables => mutate({ variables })
      })
    }),
    graphql(QUERY_PROMPTS, {
      options: ({ characterId }) => ({ variables: { characterId } }),
      props: ({ ownProps: { playerId }, data: { loading, error, allPrompts } }) => ({
        loading,
        error,
        isCharacter: window.location.href.includes(playerId),
        promptIds: allPrompts?.map(p => p.id),
        prompts: convertToObject(allPrompts)
      })
    }),
    graphql(QUERY_PROMPT_ANSWERS, {
      options: ({ playerId }) => ({ variables: { playerId } }),
      props: ({ ownProps, data: { allPromptAnswers } }) => ({
        answers: convertToObject(allPromptAnswers, 'prompt')
      })
    })
  ],
  Presenter
);
export default Main;
