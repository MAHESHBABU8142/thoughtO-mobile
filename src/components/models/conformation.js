import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export default function ConformationModel({
  visible,
  setVisible,
  headline,
  text,
  trueText,
  falseText,
  trueAction,
}) {
  return (
    <Modal visible={visible} animationType="none" transparent={true}>
      <Pressable
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
        onPress={() => setVisible(false)}
      >
        <Pressable style={styles.mainBox} onPress={() => {}}>
          <Text style={{ fontSize: 21, color: "#fff", fontWeight: "500" }}>
            {headline}
          </Text>
          <Text style={{ fontSize: 14, color: "#fff" }}>{text}</Text>
          <View style={styles.ctaContainer}>
            <Pressable style={styles.ctaBtn} onPress={() => setVisible(false)}>
              <Text style={styles.ctaText}>{falseText}</Text>
            </Pressable>
            <Pressable
              style={styles.ctaBtn}
              onPress={() => {
                trueAction();
                setVisible(false);
              }}
            >
              <Text style={styles.ctaText}>{trueText}</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

/*--------styles--------*/

const styles = StyleSheet.create({
  mainBox: {
    justifyContent: "space-between",
    width: "90%",
    backgroundColor: "#2d2d2eff",
    padding: 14,
    gap: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  ctaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ctaBtn: {
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  ctaText: {
    fontSize: 15,
    color: "#24ceecff",
    fontWeight: "500",
  },
});
