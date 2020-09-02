import React from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";

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

export default function HomeScreen() {
  const { loading, error, data } = useQuery<QueryMovies>(QUERY_MOVIES);
  const navigation = useNavigation();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  function onPressItem(movie: Movie) {
    navigation.navigate("Comments", { title: movie.title, year: movie.year });
  }

  const renderItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity onPress={() => onPressItem(item)}>
      <View style={{ marginTop: 10, marginBottom: 10 }}>
        <Text style={{ fontSize: 20 }}>{`${item.title} (${item.year})`}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ marginLeft: 10, marginRight: 10 }}>
      <FlatList
        data={data?.movies}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.title}-${item.year}`}
      />
    </View>
  );
}
