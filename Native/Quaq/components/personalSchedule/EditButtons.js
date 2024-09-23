import React from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";

const EditButtons = () => {
  try {
    return (
      <View style={styles.container}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
      </View>
    );
  } catch (error) {
    console.log("FROM EditButtons.js:", error);
  }
};

const { width } = Dimensions.get("window");
const goldColour = "#D9AC6E";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // height: "8%",
    // position: "absolute",
    bottom: 0,

    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",

    flex: 1,

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
    fontFamily: "Selawik-Semilight",
  },
});

export default EditButtons;
