import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyTickets from "./(tabs)/myTickets";
import HomeScreen from "./(tabs)/homeScreen";
import userProfile from "./(tabs)/userProfile";
import DetailScreen from "./detailScreen";
import { getLoadedFonts, useFonts } from "expo-font";
import mainBackgroundColor from "./styles/mainBackgroundColor";
import { Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import ReservationScreen from "./reservationScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <Stack.Navigator>
        {/* Main Tab Navigator */}
        <Stack.Screen
          name="MainTabs"
          component={MainTabNavigator}
          options={{ headerShown: false }} // Hide header for tabs
        />
        {/* Non-tab Screen */}
        <Stack.Screen name="Details" component={DetailScreen} />
        <Stack.Screen name="Reservation" component={ReservationScreen} />
      </Stack.Navigator>
      <Toast />
    </>
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
      <Tab.Screen
        name="User Profile"
        component={userProfile}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <Image
              source={require("../assets/images/user-icon.png")}
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
