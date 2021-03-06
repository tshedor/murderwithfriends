import { graphql, compose } from 'react-apollo'
import { branch, renderComponent } from 'recompose'
import { withRouter } from 'react-router-dom'

import Loading from '+dumb/Loading'
import composeWithLoadingAndError from '+root/universal/factories/composeWithLoadingAndError'

import MUTATION_SIGNUP_USER from './remote.graphql'

import Presenter from './presenter'

const Main = composeWithLoadingAndError(
  graphql(MUTATION_SIGNUP_USER, {
    props: ({ mutate }) => ({
      onSubmit: async (variables) => {
        try {
          const user = await mutate({ variables })
          localStorage.setItem('graphcoolToken', user.data.registerUser.token)
          return Promise.resolve(true);
        } catch (e) {
          return Promise.reject(e)
        }
      }
    })
  }),
  withRouter(Presenter)
);

export default Main;
