import React from "react";
import Home from "./src/Home";
import ApolloProvider from "./src/ApolloProvider";
import { StyleSheet, View } from "react-native";

export default function App() {
  return (
    <ApolloProvider>
      <View style={styles.center}>
        <Home />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginTop: 40,
  },
});
