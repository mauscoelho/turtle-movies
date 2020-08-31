import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { gql, useQuery } from "@apollo/client";

const QUERY_MOVIES = gql`
  query GetMovies {
    movies {
      description
      title
      year
    }
  }
`;

interface Movie {
  description: string;
  title: string;
  year: string;
}

interface QueryMovies {
  movies: Movie[];
}

export default function Home() {
  const { loading, error, data } = useQuery<QueryMovies>(QUERY_MOVIES);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  const renderItem = ({ item }: { item: Movie }) => (
    <View style={{ marginTop: 5, marginBottom: 5 }}>
      <Text>{`${item.title} (${item.year})`}</Text>
    </View>
  );

  return (
    <View style={{ margin: 15 }}>
      <Text style={{ fontSize: 30, marginBottom: 10 }}>My Movies</Text>
      <FlatList
        data={data?.movies}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.title}-${item.year}`}
      />
    </View>
  );
}
