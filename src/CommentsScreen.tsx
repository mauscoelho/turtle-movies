import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { RootStackParamList } from "../App";
import { RouteProp } from "@react-navigation/native";
import { collection, add, subcollection, Ref } from "typesaurus";
import { useAll } from "@typesaurus/react";

type CommentsScreenRouteProp = RouteProp<RootStackParamList, "Comments">;

type Props = {
  route: CommentsScreenRouteProp;
};

type Comment = {
  text: string;
};

export default function CommentsScreen(props: Props) {
  const title = `${props.route.params.title} - (${props.route.params.year})`;
  const key = `comments-${encodeURI(title)}`;
  const commentsRef = collection<Comment>(key);

  const allComments = useAll(commentsRef);

  return (
    <View style={{ margin: 10 }}>
      <Text style={{ fontSize: 20 }}>{title}</Text>
      {allComments?.map((comment, index) => (
        <Text key={index}>{comment.data.text}</Text>
      ))}
    </View>
  );
}
