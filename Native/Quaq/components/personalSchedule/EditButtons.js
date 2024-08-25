import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const EditButtons = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get("window");
const goldColour = "#D9AC6E";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "8%",
    position: "absolute",
    bottom: 0,

    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",

    // alignSelf: "center", // ???
    // backgroundColor: "red", // TESTING
  },
  button: {
    width: "45%",
    height: "80%",
    backgroundColor: "black",
    borderColor: goldColour,
    borderWidth: 2,
    borderRadius: 5,

    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default EditButtons;
