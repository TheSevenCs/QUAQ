// CustomButton.js
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Text,
} from "react-native";

const CustomButton = ({
  onPress,
  backgroundColor,
  imageSource,
  buttonStyle,
  lineStyle,
  text, // Changed from Text to text
  textStyle,
}) => {
  const [bgColor, setBgColor] = useState(backgroundColor);

  // Toggle background color
  const handlePress = () => {
    setBgColor((prevColor) =>
      prevColor === "#000000" ? "#8A6533" : "#000000"
    );
    onPress && onPress(); // Call additional onPress handler if provided
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={[styles.button, { backgroundColor: bgColor }, buttonStyle]}>
        {imageSource && <Image source={imageSource} style={styles.image} />}
        {lineStyle && <View style={[styles.line, lineStyle]} />}
        {text && <Text style={[styles.buttonText, textStyle]}>{text}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 109,
    height: 42,
    borderColor: "#D9AC6E",
    borderWidth: 3,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: 20,
    height: 20,
  },
  line: {
    width: 20,
    height: 2, // Thickness of the line
    backgroundColor: "white",
  },
  buttonText: {
    color: "#fff", // Ensure text color is white
  },
});

export default CustomButton;
