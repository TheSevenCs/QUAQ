import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigator.js";

import { useFonts } from "expo-font";

import { View, StyleSheet, Platform, StatusBar } from "react-native";
import axios from "axios";

// IMPORT PAGES/SCREENS COMPONENTS
// import { screenHome, screenClients } from "./screens";
import BackgroundGradient from "./components/common/BackgroundGradient.js";
import { UserProvider } from "./components/UserInfo.js";

export default function App() {
  // Load the font using useFonts
  let [fontsLoaded] = useFonts({
    "Selawik-Semilight": require("./assets/fonts/Selawik-Semilight.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerGradient}>
        <BackgroundGradient />
      </View>
      <View style={styles.containerContent}>
        <UserProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </UserProvider>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // stylesheet
  container: {
    flex: 1,
    backgroundColor: "orange",
    // alignItems: "center",
    // justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    position: "relative",
  },
  containerGradient: {
    ...StyleSheet.absoluteFillObject, // Ensures the gradient covers the entire screen
    zIndex: -1, // Push the gradient behind everything else
  },
  containerContent: {
    flex: 1,
    zIndex: 1, // Ensures the content is above the gradient
  },
});
