import React, { useState } from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import { RadialGradient } from "react-native-gradients";

const ScreenJobs = () => {
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
      <RadialGradient
        x="50%"
        y="50%"
        rx="50%"
        ry="50%"
        colorList={colorList}
        style={styles.gradientBg}
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
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
  },
});

export default ScreenJobs;
