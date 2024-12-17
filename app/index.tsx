import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyTickets from "./(tabs)/myTickets";
import HomeScreen from "./(tabs)/homeScreen";
import { getLoadedFonts, useFonts } from "expo-font";
import mainBackgroundColor from "./styles/mainBackgroundColor";
import { Image, ProgressBarAndroidComponent } from "react-native";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: getTabBarStyle(),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarIcon: ({ color, focused, size }) => (
            <Image source={require("../assets/images/home-icon.png")}
            style={ getImageBarStyle(color, focused, size) }
            />
          ),
        }}/>
      <Tab.Screen name="My Tickets" component={MyTickets} options={{
          tabBarIcon: ({ color, focused, size }) => (
            <Image source={require("../assets/images/ticket-icon.png")}
            style={ getImageBarStyle(color, focused, size) }
            />
          ),
        }} />
    </Tab.Navigator>
  );
}

function getImageBarStyle(color : string, focused: boolean, size: number): any {
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
