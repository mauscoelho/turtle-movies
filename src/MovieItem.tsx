import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Movie } from "./HomeScreen";
import { Colors } from "./constants";

interface Props {
  movie: Movie;
}

export function MovieItem({ movie }: Props) {
  const navigation = useNavigation();

  function onPressItem() {
    navigation.navigate("Comments", { title: movie.title, year: movie.year });
  }

  return (
    <TouchableOpacity onPress={onPressItem}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Text style={styles.rating}>{`★ ${movie.rating}`}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text
            style={styles.subTitle}
          >{`⏳ ${movie.runtime}min 👍 ${movie.votes}`}</Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.description}
          >
            {movie.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 8,
    padding: 14,
    backgroundColor: Colors.background,
    borderRadius: 8,
    borderColor: "rgba(144, 122, 214, 0.4)",
    borderWidth: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.white,
  },
  subTitle: {
    fontSize: 16,
    color: Colors.grey,
    marginTop: 4,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.grey,
  },
  imageContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  rating: {
    fontSize: 18,
    color: Colors.yellow,
    fontWeight: "bold",
  },
  year: {
    marginTop: 2,
    color: Colors.grey,
  },
});
