import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import App from './App';

// end of imports

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem('user-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

const httpLink = new HttpLink({ uri: 'http://localhost:4000' });

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000',
  })
);

const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);

    return (
      def.kind === 'OperationDefinition' && def.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
