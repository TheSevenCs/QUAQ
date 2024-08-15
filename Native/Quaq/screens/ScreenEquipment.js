// ScreenEquipment.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { RadialGradient } from "react-native-gradients";
import CustomButton from "../Components/CustomButton"; // Import the reusable button component

const ScreenEquipment = () => {
  return (
    <View style={styles.container}>
      <RadialGradient
        x="50%"
        y="50%"
        rx="50%"
        ry="50%"
        colorList={colorList}
        style={styles.gradientBg} // Ensure RadialGradient covers the entire screen
      />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Equipment</Text>
        <Text style={styles.subtitle}>Groups</Text>
        <View style={styles.goldLine} />
      </View>

      <View style={styles.CDButtonsContainer}>
        <CustomButton
          imageSource={require("../assets/add.png")}
          backgroundColor="#000000"
          buttonStyle={styles.CDButton}
        />
        <CustomButton
          backgroundColor="#000000"
          buttonStyle={styles.CDButton}
          lineStyle={styles.deleteLine} // Display a horizontal line
        />
      </View>
      <StatusBar style="light" />
    </View>
  );
};

const colorList = [
  { offset: "0%", color: "#131313", opacity: "1" },
  { offset: "66.9%", color: "#2D2C2C", opacity: "1" },
  { offset: "100%", color: "#131313", opacity: "1" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent", // Ensure background color is transparent
  },
  gradientBg: {
    ...StyleSheet.absoluteFillObject, // Ensure gradient covers the entire view
  },
  contentContainer: {
    position: "absolute", // Ensure content is above gradient
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1, // Make sure content is above other elements
  },
  title: {
    color: "white",
    fontSize: 33,
    backgroundColor: "black",
    textAlign: "center",
    width: "100%",
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  subtitle: {
    color: "white",
    backgroundColor: "black",
    width: 118,
    borderRadius: 19,
    textAlign: "center",
    paddingVertical: 4,
    paddingHorizontal: 10,
    overflow: "hidden",
    fontSize: 24,
    marginTop: 15,
  },
  goldLine: {
    height: 2, // Thickness of the line
    marginTop: 12,
    backgroundColor: "#D9AC6E", // Color of the line
    width: "100%", // Full width of the container
  },
  CDButtonsContainer: {
    width: "100%",
    alignItems: "center", // Center the button horizontally
    justifyContent: "center",
    bottom: 450,
    gap: 18,
    flex: 1,
    flexDirection: "row",
  },
  CDButton: {
    width: 109,
    height: 42,
  },
  deleteLine: {
    width: 20,
    height: 2, // Thickness of the line
    backgroundColor: "white",
  },
});

export default ScreenEquipment;
