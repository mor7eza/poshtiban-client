import React from "react";

import App from "./App";

import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from "@apollo/client";

const newApolloClient = (authToken = "") => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://poshtiban-server.herokuapp.com",
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }),
    cache: new InMemoryCache()
  });
};

export const client = newApolloClient();

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
