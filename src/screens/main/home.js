import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import ActionSheet from "../../components/models/action-sheet";
import ConformationModel from "../../components/models/conformation";
import { getItem } from "../../utils/async-storage-helpers";
import { showToast } from "../../utils/helpers";
import { copyNote, removeNote, shareNote } from "../../utils/note-helpers";

export default function Home({ navigation }) {
  const [DATA, setData] = useState([]);
  const [conformationOpen, setConformationOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [actionSheetOpen, setActionSheetOpen] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getItem("notes").then((data) => setData(data));
    }, [])
  );

  function deleteNote() {
    removeNote(selectedId, setData).then((result) => {
      if (result) {
        showToast("Note deleted successfully!");
        return;
      }
      showToast("Error deleting note!");
    });
  }

  return (
    <View
      style={{
        backgroundColor: "#000003",
        flex: 1,
      }}
    >
      <Pressable
        onPress={() => navigation.navigate("AddNote")}
        style={{
          position: "absolute",
          bottom: 65,
          right: 45,
          zIndex: 10,
          backgroundColor: "#464545ff",
          borderRadius: 50,
          padding: 10,
        }}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </Pressable>

      <ConformationModel
        visible={conformationOpen}
        setVisible={setConformationOpen}
        headline="Delete Note"
        text="Are you sure you want to delete this note?"
        trueText="DELETE"
        falseText="CANCEL"
        trueAction={deleteNote}
      />

      <ActionSheet
        visible={actionSheetOpen}
        setVisible={setActionSheetOpen}
        options={[
          {
            name: "Open",
            action: () => {
              navigation.navigate("ViewNote", {
                note: DATA.find((note) => note.id === selectedId),
              });
            },
          },
          {
            name: "Edit",
            action: () => {
              navigation.navigate("AddNote", {
                note: DATA.find((note) => note.id === selectedId),
              });
            },
          },
          {
            name: "Copy",
            action: () => {
              copyNote(selectedId);
              showToast("Copied to clipboard!");
            },
          },
          {
            name: "Share",
            action: () => {
              shareNote(selectedId);
            },
          },
          { name: "Delete", action: () => setConformationOpen(true) },
        ]}
      />

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onLongPress={() => {
              setSelectedId(item.id);
              setActionSheetOpen(true);
            }}
            onPress={() => navigation.navigate("ViewNote", { note: item })}
            style={({ pressed }) => ({
              backgroundColor: pressed
                ? "rgba(255, 255, 255, 0.2)"
                : "#242424e5",
              transform: [{ scale: pressed ? 0.98 : 1 }],
              flex: 1,
              padding: 10,
              marginHorizontal: 8,
              borderRadius: 5,
              gap: 5,
              borderBottomColor: "#202020ff",
              borderBottomWidth: 1,
            })}
          >
            {item.title && (
              <Text
                style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}
                numberOfLines={2}
              >
                {item.title}
              </Text>
            )}
            {item.content && (
              <Text
                style={{ color: "#ffffffce", fontSize: 15 }}
                numberOfLines={5}
              >
                {item.content || ""}
              </Text>
            )}
          </Pressable>
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 5,
            }}
          />
        )}
      />
    </View>
  );
}
