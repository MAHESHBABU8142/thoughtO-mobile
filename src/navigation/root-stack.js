import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddNote from "../screens/features/add-note.js";
import ViewNote from "../screens/features/view-note.js";
import Tabs from "./tabs/tabs.js";
const RootStacks = createNativeStackNavigator();

export default function RootStack() {
  return (
    <NavigationContainer>
      <RootStacks.Navigator
        initialRouteName="Tabs"
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStacks.Screen name="Tabs" component={Tabs}></RootStacks.Screen>

        <RootStacks.Screen
          name="AddNote"
          component={AddNote}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#000003" },
            headerTintColor: "#fff",
            headerTitle: "Add Note",
            animation: "slide_from_right",
            presentation: "card",
          }}
        />
        <RootStacks.Screen
          name="ViewNote"
          component={ViewNote}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#000003" },
            headerTintColor: "#fff",
            headerTitle: "View Note",
            animation: "slide_from_right",
            presentation: "card",
          }}
        />
      </RootStacks.Navigator>
    </NavigationContainer>
  );
}
