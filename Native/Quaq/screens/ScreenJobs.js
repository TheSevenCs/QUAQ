import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

import { RadialGradient } from "react-native-gradients";

const ScreenJobs = () => {
  const navigation = useNavigation(); // Get the navigation object

  const [groupData, setGroupData] = useState([
    { title: "Group 1" },
    { title: "Group 2" },
    { title: "Group 3" },
    { title: "Group 1" },
    { title: "Group 2" },
    { title: "Group 1" },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Jobs</Text>
        </View>
        <TouchableOpacity
          style={styles.backArrowContainer}
          onPress={() => navigation.navigate("Home")} // Navigate to Home screen on press
        >
          <Image
            source={require("../assets/backarrw.png")}
            style={styles.backarrw}
          />
        </TouchableOpacity>
        <View style={styles.goldLine} />
        <View></View>
      </View>
      <RadialGradient
        x="50%"
        y="50%"
        rx="50%"
        ry="50%"
        colorList={colorList}
        style={styles.gradientBg} // Make sure the gradient covers the entire screen
      />
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
    height: "100%",
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent", // Keep this transparent to allow the gradient to show through
    zIndex: 1,
  },
  gradientBg: {
    height: "100%",
    width: "100%",
    zIndex: -1, // This ensures the gradient is behind other content
    position: "absolute",
  },
  title: {
    top: 9,
    color: "white",
    fontSize: 33,
    textAlign: "center",
    width: "100%",
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  titleContainer: {
    backgroundColor: "black",
    width: "100%",
  },
  contentContainer: {
    position: "absolute",
    top: 0, // Adjust as necessary
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1, // Ensure it's above the gradient
  },
  goldLine: {
    height: 4,
    backgroundColor: "#D9AC6E",
    width: "100%",
  },
  backArrowContainer: {
    position: "absolute",
    left: 30,
    top: 35,
    paddingVertical: 8,
    paddingHorizontal: 18.3,
    borderColor: "#D9AC6E",
    borderWidth: 2,
    borderRadius: 8,
  },
});

export default ScreenJobs;
