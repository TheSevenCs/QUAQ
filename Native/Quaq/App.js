import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigator.js";

import { useFonts } from "expo-font";

import { View, StyleSheet, Platform, StatusBar } from "react-native";
import axios from "axios";

// IMPORT PAGES/SCREENS COMPONENTS
import { screenHome, screenClients } from "./screens";

export default function App() {
  // Load the font using useFonts
  let [fontsLoaded] = useFonts({
    "Selawik-Semilight": require("./assets/fonts/Selawik-Semilight.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // stylesheet
  container: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
