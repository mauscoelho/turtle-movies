import React from "react";
import { Text, View, FlatList } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { MovieItem } from "./MovieItem";
import { Colors } from "./constants";

const QUERY_MOVIES = gql`
  query GetMovies {
    movies {
      description
      title
      year
      runtime
      rating
      votes
    }
  }
`;

export interface Movie {
  description: string;
  title: string;
  year: string;
  runtime: string;
  rating: string;
  votes: string;
}

interface QueryMovies {
  movies: Movie[];
}

export default function HomeScreen() {
  const { loading, error, data } = useQuery<QueryMovies>(QUERY_MOVIES);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  const renderItem = ({ item }: { item: Movie }) => (
    <MovieItem movie={item}></MovieItem>
  );

  return (
    <View
      style={{
        paddingTop: 10,
        paddingLeft: 14,
        paddingRight: 14,
        backgroundColor: Colors.background,
      }}
    >
      <FlatList
        data={data?.movies}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.title}-${item.year}`}
      />
    </View>
  );
}
