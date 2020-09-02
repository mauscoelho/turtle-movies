import React, { useState } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RootStackParamList } from "../App";
import { RouteProp } from "@react-navigation/native";
import { collection, add, order } from "typesaurus";
import { useOnQuery } from "@typesaurus/react";

type CommentsScreenRouteProp = RouteProp<RootStackParamList, "Comments">;

type Props = {
  route: CommentsScreenRouteProp;
};

type Comment = {
  text: string;
  created_at: number;
};

export default function CommentsScreen(props: Props) {
  const [text, onChangeText] = useState<string>();

  const title = `${props.route.params.title} - (${props.route.params.year})`;
  const key = `comments-${encodeURI(title)}`;
  const commentsRef = collection<Comment>(key);
  const allComments = useOnQuery(commentsRef, [order("created_at")]);

  function onPressSend() {
    if (text) {
      add(commentsRef, { text, created_at: Date.now() });
      onChangeText("");
    }
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, margin: 10 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>{title}</Text>
        {allComments?.map((comment, index) => (
          <Text style={{ margin: 6 }} key={index}>
            {comment.data.text}
          </Text>
        ))}
      </View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={{
            height: 40,
            flex: 1,
          }}
          onChangeText={(text) => onChangeText(text)}
          value={text}
          placeholder="Write comment"
          returnKeyType="send"
          onSubmitEditing={onPressSend}
        ></TextInput>
        <Button title="Send" onPress={onPressSend}></Button>
      </View>
    </KeyboardAwareScrollView>
  );
}
