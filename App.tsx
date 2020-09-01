import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ApolloProvider from "./src/ApolloProvider";
import HomeScreen from "./src/HomeScreen";
import CommentsScreen from "./src/CommentsScreen";

export type RootStackParamList = {
  Movies: undefined;
  Comments: { title: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ApolloProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Movies" component={HomeScreen} />
          <Stack.Screen name="Comments" component={CommentsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
