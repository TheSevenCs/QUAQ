import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const NavBar = ({ screenTitle }) => {
  try {
    return (
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <Text style={styles.titleText}>{screenTitle}</Text>
        </View>
        <View style={styles.line} />
      </View>
    );
  } catch (error) {
    console.log("FROM NavBar.js:", error);
  }
};

const { height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // height: windowHeight * 0.1 + 2,
    backgroundColor: "transparent",
    flex: 1,
  },
  titleBar: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    alignItems: "center", // horizontal move to center
    justifyContent: "center", // vertical move to center
  },
  titleText: {
    color: "white",
    fontSize: 33,
    fontFamily: "Selawik-Semilight",
    justifyContent: "center",
    alignContent: "center",
  },
  line: {
    height: 2,
    backgroundColor: "#D9AC6E",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
});

export default NavBar;
