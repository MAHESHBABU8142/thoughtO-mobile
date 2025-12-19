import { Ionicons } from "@expo/vector-icons";
import { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView, TextInput } from "react-native";
import { showToast } from "../../utils/helpers";
import { saveNote, updateNote } from "../../utils/note-helpers";

export default function AddNote({ navigation, route }) {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    let note = route?.params?.note;
    if (note) {
      setId(note.id);
      setTitle(note.title);
      setContent(note.content);
    }
  }, [route?.params?.note]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Ionicons
            name="checkmark-sharp"
            color="white"
            size={20}
            style={{ marginRight: 10, padding: 10 }}
            onPress={() => {
              if (id) {
                updateNote({ title, content, id }).then(() => {
                  showToast("Note updated successfully!");
                  navigation.goBack();
                });
                return;
              }
              saveNote({ title, content }).then((result) => {
                if (result === null) return;
                if (result) {
                  showToast("Note saved successfully!");
                  navigation.goBack();
                  return;
                }
                showToast("Error saving note!");
              });
            }}
          />
        );
      },
    });
  }, [navigation, title, content, id]);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#000003",
      }}
    >
      <TextInput
        multiline
        placeholder="Title"
        placeholderTextColor="#888"
        style={{
          paddingHorizontal: 13,
          color: "#fff",
          fontSize: 23,
          fontWeight: "600",
          maxHeight: 280,
        }}
        value={title}
        onChangeText={(text) => setTitle(text)}
      ></TextInput>
      <TextInput
        multiline
        autoFocus
        placeholder="Start your note here..."
        placeholderTextColor="#888"
        style={{
          paddingHorizontal: 13,
          color: "#fff",
          fontSize: 16,
          fontWeight: "500",
          maxHeight: 900,
          marginVertical: 10,
        }}
        value={content}
        onChangeText={(text) => setContent(text)}
      ></TextInput>
    </ScrollView>
  );
}
