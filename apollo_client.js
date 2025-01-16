
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';

import {
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import fetch from 'cross-fetch';

import introspectionQueryResultData from './coursePreviewSchema';

const buildUrl = () => (
  `${process.env.CONTENT_STACK_GQL_ENDPOINT}/stacks/${process.env.CONTENT_STACK_GQL_API_KEY}?environment=${process.env.CONTENT_STACK_GQL_ENVIRONMENT}`
);
console.log("-----------------------------------------", buildUrl())
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({
  fragmentMatcher,
  // when freezeResults is true we can not mutate the cache.
  // can't directly assign/change the data to cache. it will raise error on browser console.
  freezeResults: true,
});

const link = new HttpLink({
  uri: buildUrl(),
  headers: {
    access_token: process.env.CONTENT_STACK_GQL_DELIVERY_TOKEN,
  },
  fetch,
});

const createApolloClient = () => {
  return new ApolloClient({
    link: ApolloLink.from([link]),
    cache,
  });
};

export default createApolloClient;






