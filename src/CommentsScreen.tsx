import React from "react";
import { Text, View } from "react-native";
import { RootStackParamList } from "../App";
import { RouteProp } from "@react-navigation/native";

type CommentsScreenRouteProp = RouteProp<RootStackParamList, "Comments">;

type Props = {
  route: CommentsScreenRouteProp;
};

export default function CommentsScreen(props: Props) {
  return (
    <View style={{ margin: 10 }}>
      <Text style={{ fontSize: 20 }}>{props.route.params.title}</Text>
    </View>
  );
}
