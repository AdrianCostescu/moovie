import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { RestLink } from "apollo-link-rest";

const restLink = new RestLink({ uri: "http://localhost:8000/" });

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink,
});

export { apolloClient };
 