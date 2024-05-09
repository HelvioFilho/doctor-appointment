import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const apiUrl = process.env.EXPO_PUBLIC_URL_API;

const httpLink = new HttpLink({
  uri: apiUrl,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
