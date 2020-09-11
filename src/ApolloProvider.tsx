import React from "react";
import {
  gql,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { SchemaLink } from "apollo-link-schema";
import { getMovies } from "./dataSources/moviesAPI";

const typeDefs = gql`
  type Movie {
    description: String
    title: String
    year: String
    runtime: String
    rating: String
    votes: String
  }

  type Query {
    movies: [Movie]
  }
`;

const resolvers = {
  Query: {
    movies: () => getMovies(),
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: (new SchemaLink({ schema }) as unknown) as ApolloLink,
});

interface Props {
  children?: React.ReactElement;
}

export default function App(props: Props) {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
