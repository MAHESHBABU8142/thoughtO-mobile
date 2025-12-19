import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Folders from "../../screens/main/folders";
import Home from "../../screens/main/home";
import Settings from "../../screens/main/settings";
const Tab = createBottomTabNavigator();
export default function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#000003",
        },
        headerTintColor: "#fff",
        tabBarInactiveTintColor: "#fff",
        tabBarActiveTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#000003",
          height: 55,
          borderColor: "#000003",
        },
        tabBarLabelStyle: {
          fontSize: 10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "ThoughtO",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={22}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Folders"
        component={Folders}
        options={{
          title: "Folders",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "folder" : "folder-outline"}
              color={color}
              size={22}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Settings",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              color={color}
              size={22}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
