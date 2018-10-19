import { graphql } from 'react-apollo'
import {
  IsUserLoggedIn as QUERY_IS_LOGGED_IN,
  GetParties as QUERY_ALL_OWNED_PARTIES,
  AllParties as QUERY_ALL_PARTIES
} from './remote.graphql'

import composeWithLoadingAndError from '+root/universal/factories/composeWithLoadingAndError'

import Presenter from './presenter'

const Main = composeWithLoadingAndError(
  graphql(QUERY_ALL_PARTIES),
  Presenter
  // graphql(QUERY_IS_LOGGED_IN, {
  //   props: ({ data }) => ({
  //     loggedInUserId: !!data.loggedInUser?.id
  //   })
  // }),
  // graphql(QUERY_ALL_PARTIES, {
  //   options: ({ loggedInUserId }) => ({ variables: { userId: loggedInUserId } })
  // }),
);

export default Main;
