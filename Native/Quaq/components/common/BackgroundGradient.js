import React from "react";
import { View, StyleSheet } from "react-native";
import { RadialGradient } from "react-native-gradients";
// import { BackgroundGradient } from ".";

const BackgroundGradient = () => {
  const colorList = [
    { offset: "0%", color: "#131313", opacity: "1" },
    { offset: "66.9%", color: "#2D2C2C", opacity: "1" },
    { offset: "100%", color: "#131313", opacity: "1" },
  ];

  return (
    // <View style={styles.gradientContainer}>
    <RadialGradient
      x="50%"
      y="50%"
      rx="50%"
      ry="50%"
      colorList={colorList}
      style={styles.gradientBg}
    />
    // </View>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1, // Push the gradient behind everything else
  },
  gradientBg: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -1,
    top: 0,
    left: 0,
  },
});

export default BackgroundGradient;
