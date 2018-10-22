import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { withClientState } from 'apollo-link-state'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

import { getToken } from '+root/utils/auth'

// const isDev = true
// TODO HACK A HACK
const isDev = BUILD_ENV === 'development'

const GRAPHCOOL_SERVICE_ID = isDev ? 'cjjet83250dop0114ntopy45r' : 'cjiuzhol98qpl01183yopq2km'
const cache = new InMemoryCache().restore(isDev ? {} : window.__APOLLO_STATE__);

export const httpLink = new HttpLink({
  uri: `https://api.graph.cool/simple/v1/${GRAPHCOOL_SERVICE_ID}`
});

const wsLink = new WebSocketLink({
  uri: `wss://subscriptions.us-west-2.graph.cool/v1/${GRAPHCOOL_SERVICE_ID}`,
  options: {
    reconnect: true
  }
});

const httpAndSubscribeLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const authorizationLink = new ApolloLink((operation, forward) => {
  const token = getToken();

  const authorization = token ? `Bearer ${token}` : null

  operation.setContext({
    headers: {
      authorization
    }
  })

  return forward(operation)
});

const makeStateMutation = (key, __typename, defaultValues) => {
  const propNames = Object.keys(defaultValues) || [];

  return {
    resolver: (_, args, { cache }) => {
      const keyValues = propNames.reduce((acc, curr) => {
        acc[curr] = args[curr]
        return acc;
      }, {});

      const data = {
        [key]: {
          __typename,
          ...keyValues
        },
      };

      cache.writeData({ data });
      return null;
    },

    default: {
      [key]: {
        __typename,
        ...defaultValues
      }
    }
  };
};

const setCurrentParty = makeStateMutation('currentParty', 'CurrentParty', { id: null, isOwner: false });
const setCurrentPlayer = makeStateMutation('currentPlayer', 'CurrentPlayer', { id: null });

const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation: {
      clientSetCurrentParty: setCurrentParty.resolver,
      clientSetCurrentPlayer: setCurrentPlayer.resolver
    },
  },
  defaults: {
    ...setCurrentParty.default,
    ...setCurrentPlayer.default
  },
});

const link = ApolloLink.from([
  stateLink,
  authorizationLink,
  httpAndSubscribeLink
]);

const client = new ApolloClient({
  link,
  cache
});

export default client;
