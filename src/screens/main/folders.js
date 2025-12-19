import { Text, View } from "react-native";
export default function Folders({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text onPress={() => navigation.navigate("Todo")}>i am folders sir</Text>
    </View>
  );
}
