import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";
import "firebase/firestore";
import ApolloProvider from "./src/ApolloProvider";
import HomeScreen, { Movie } from "./src/HomeScreen";
import CommentsScreen from "./src/CommentsScreen";
import { Colors } from "./src/constants";

// TODO: make it safe
const firebaseConfig = {
  apiKey: "AIzaSyCzPLgFO4WhC3LAPuN9dFOLmWArNEeyGtA",
  authDomain: "turtle-movies-b9c68.firebaseapp.com",
  databaseURL: "https://turtle-movies-b9c68.firebaseio.com",
  projectId: "turtle-movies-b9c68",
  storageBucket: "turtle-movies-b9c68.appspot.com",
  messagingSenderId: "156670765937",
  appId: "1:156670765937:web:2b26a2ad6272a76ed4a4d0",
};

firebase.initializeApp(firebaseConfig);

export type RootStackParamList = {
  Movies: undefined;
  Comments: { movie: Movie };
};

const Stack = createStackNavigator<RootStackParamList>();

const headerOptions = {
  headerStyle: {
    backgroundColor: Colors.background,
    shadowColor: "transparent",
  },
  headerTintColor: Colors.white,
};

export default function App() {
  return (
    <ApolloProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Movies"
            component={HomeScreen}
            options={headerOptions}
          />
          <Stack.Screen
            name="Comments"
            component={CommentsScreen}
            options={({ route }) => ({
              title: route.params.movie.title,
              ...headerOptions,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
