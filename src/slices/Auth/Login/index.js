import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { setToken } from '+root/utils/auth'

import composeWithLoadingAndError from '+root/universal/factories/composeWithLoadingAndError'

import LOGIN_USER from './remote.graphql';

import Presenter from './presenter'

const Main = composeWithLoadingAndError(
  graphql<{},{ authenticateUser: { token: string } },{},{}>(LOGIN_USER, {
    props: ({ mutate }) => ({
      onSubmit: async (variables) => {
        const response = await mutate({ variables });
        setToken(response.data.authenticateUser.token);
      }
    })
  }),
  withRouter(Presenter)
);

export default Main;
