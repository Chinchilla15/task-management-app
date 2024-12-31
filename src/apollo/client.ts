import { ApolloClient, InMemoryCache } from "@apollo/client";

const token = import.meta.env.VITE_GRAPHQL_API_TOKEN;

const uri = import.meta.env.VITE_GRAPHQL_API_URL;

export const client = new ApolloClient({
  uri: uri,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});
