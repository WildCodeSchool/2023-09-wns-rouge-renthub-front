import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    headers: {
      "apollo-require-preflight": "true",
    },
  }),
  cache: new InMemoryCache(),
});
