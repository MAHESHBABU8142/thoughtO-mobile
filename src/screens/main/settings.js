import { Text, View } from "react-native";
export default function Settings({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => navigation.navigate("Todo")}
      >i am settings sir</Text>
    </View>
  );
}
