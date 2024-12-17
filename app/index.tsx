import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyTickets from "./(tabs)/myTickets";
import HomeScreen from "./(tabs)/homeScreen";
import DetailScreen from "./detailScreen";
import { getLoadedFonts, useFonts } from "expo-font";
import mainBackgroundColor from "./styles/mainBackgroundColor";
import { Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator>
      {/* Main Tab Navigator */}
      <Stack.Screen
        name="MainTabs"
        component={MainTabNavigator}
        options={{ headerShown: false }} // Hide header for tabs
      />
      {/* Non-tab Screen */}
      <Stack.Screen name="Details" component={DetailScreen} />
    </Stack.Navigator>
  );
}


function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: getTabBarStyle(),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <Image
              source={require("../assets/images/home-icon.png")}
              style={getImageBarStyle(color, focused, size)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="My Tickets"
        component={MyTickets}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <Image
              source={require("../assets/images/ticket-icon.png")}
              style={getImageBarStyle(color, focused, size)}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function getImageBarStyle(color: string, focused: boolean, size: number): any {
  return {
    tintColor: color,
    width: size,
    height: size,
  };
}

function getTabBarStyle(): any {
  return {
    backgroundColor: mainBackgroundColor.mainBackgroundColor.backgroundColor,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    // height: 75,
  };
}
