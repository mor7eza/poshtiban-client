import React from "react";

import App from "./App";

import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from "@apollo/client";

const newApolloClient = (authToken = "") => {
  //TODO: manage jwt token read from localStorage
  return new ApolloClient({
    link: new HttpLink({
      uri: "http://localhost:5000",
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }),
    cache: new InMemoryCache()
  });
};

const client = newApolloClient();

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
