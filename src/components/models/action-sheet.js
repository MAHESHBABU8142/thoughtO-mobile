import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, Text } from "react-native";

function CreateOption({ name, action, setVisible }) {
  let icon = null;
  switch (name) {
    case "Copy":
      icon = "copy-outline";
      break;
    case "Edit":
      icon = "create-outline";
      break;
    case "Share":
      icon = "share-outline";
      break;
    case "Delete":
      icon = "trash-outline";
      break;
    case "Open":
      icon = "open-outline";
      break;
  }
  return (
    <Pressable
      style={styles.option}
      onPress={() => {
        action && action();
        setVisible(false);
      }}
    >
      <Ionicons name={icon} color="#fff" size={21} />
      <Text style={styles.optionText}>{name}</Text>
    </Pressable>
  );
}

export default function ActionSheet({ visible, setVisible, options }) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <Pressable
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.24)",
        }}
        onPress={() => setVisible(false)}
      >
        <Pressable style={styles.mainBox} onPress={() => {}}>
          {options.map((option) => (
            <CreateOption
              key={option.name}
              name={option.name}
              action={option.action}
              setVisible={setVisible}
            />
          ))}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

/*--------styles--------*/

const styles = StyleSheet.create({
  mainBox: {
    justifyContent: "space-between",
    width: "95%",
    backgroundColor: "#2d2d2eff",
    paddingVertical: 15,
    gap: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 6,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  optionText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "400",
  },
});
