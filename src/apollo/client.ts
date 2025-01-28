import { VITE_GRAPHQL_API_TOKEN, VITE_GRAPHQL_API_URL } from "@/config/env";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const token = VITE_GRAPHQL_API_TOKEN;
const uri = VITE_GRAPHQL_API_URL;

export const client = new ApolloClient({
  uri: uri,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-first",
    },
  },
});
