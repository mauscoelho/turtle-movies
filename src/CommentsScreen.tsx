import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RootStackParamList } from "../App";
import { RouteProp } from "@react-navigation/native";
import { collection, add, order } from "typesaurus";
import { useOnQuery } from "@typesaurus/react";
import { Colors } from "./constants";

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
  const { movie } = props.route.params;
  const title = `${movie.title} - (${movie.year})`;
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
    <View style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.scrollContainer}>
          <Text style={styles.description}>{movie.description}</Text>
          <View style={styles.comments}>
            {allComments?.map((comment, index) => (
              <View style={styles.commentContainer} key={index}>
                <Text style={styles.comment} key={index}>
                  {comment.data.text}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => onChangeText(text)}
            value={text}
            placeholder="Write comment"
            placeholderTextColor={Colors.grey}
            returnKeyType="send"
            onSubmitEditing={onPressSend}
          ></TextInput>
          <Button title="Send" onPress={onPressSend}></Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: {
    flex: 1,
    padding: 12,
  },
  scrollContainer: {
    flex: 1,
  },
  description: {
    marginBottom: 14,
    fontSize: 16,
    color: Colors.white,
  },
  textInput: {
    height: 40,
    flex: 1,
    fontSize: 20,
    color: Colors.white,
    paddingBottom: 10,
  },
  comments: {
    alignItems: "flex-start",
    flexDirection: "column",
  },
  commentContainer: {
    marginBottom: 6,
    marginTop: 6,
    padding: 14,
    backgroundColor: "rgba(144, 122, 214, 0.7)",
    borderRadius: 20,
  },
  comment: {
    color: Colors.white,
    fontSize: 18,
  },
});
