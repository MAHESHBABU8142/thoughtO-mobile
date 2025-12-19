import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useLayoutEffect } from "react";
import { ScrollView, Share, Text, View } from "react-native";
import { showToast } from "../../utils/helpers";

export default function ViewNote({ navigation, route }) {
  const note = route.params.note;
  if (!note.title) note.title = "Untitled Note";

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View
            style={{
              flexDirection: "row",
              gap: 7,
            }}
          >
            <Ionicons
              name="copy-outline"
              color="white"
              size={21}
              style={{
                padding: 10,
              }}
              onPress={async () => {
                let text = `${note.title}\n\n${note.content}`;
                await Clipboard.setStringAsync(text);
                showToast("Copied to clipboard!");
              }}
            />
            <Ionicons
              name="share-outline"
              color="white"
              size={21}
              style={{
                padding: 10,
              }}
              onPress={() => {
                Share.share({
                  message: `${note.title}\n\n${note.content}`,
                });
              }}
            />
          </View>
        );
      },
    });
  }, [navigation, note]);

  return (
    <ScrollView
      style={{
        backgroundColor: "#000003",
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "#000003",
          flex: 1,
          gap: 15,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 23,
            fontWeight: "600",
            paddingHorizontal: 15,
            lineHeight: 23,
          }}
        >
          {note.title}
        </Text>
        <Text
          style={{
            color: "#fff",
            paddingHorizontal: 15,
            fontSize: 15,
            fontWeight: "500",
            lineHeight: 22,
          }}
        >
          {note.content}
        </Text>
      </View>
    </ScrollView>
  );
}
