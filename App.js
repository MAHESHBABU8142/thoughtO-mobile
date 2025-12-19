import { StatusBar, View } from "react-native";
import RootStack from "./src/navigation/root-stack";
export default function App() {
  return (
    <>
      <StatusBar backgroundColor="rgb(0,0,3)" />
      <View style={{ flex: 1, backgroundColor: "#000003" }}>
        <RootStack />
      </View>
    </>
  );
}
