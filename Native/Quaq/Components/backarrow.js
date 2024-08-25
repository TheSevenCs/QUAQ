import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const BackArrow = () => {
  const navigation = useNavigation(); // Get the navigation object

  return (
    <TouchableOpacity
      style={styles.backArrowContainer}
      onPress={() => navigation.navigate("Home")} // Navigate to Home screen on press
    >
      <Image
        source={require("../assets/backarrw.png")}
        style={styles.backarrw}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  backarrw: {
    width: 30,
    height: 30,
  },
});

export default BackArrow;
