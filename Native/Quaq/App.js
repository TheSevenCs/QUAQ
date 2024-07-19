import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Quaq</Text>
      </View>
      <View style={styles.buttonFlex}>
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={() => {}}
        >
          <Text style={styles.buttonText}>Howdy</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  container: {
    flex: 0.2,
    backgroundColor: "gold",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonFlex: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonText: {
    textAlign: "center",
    padding: 10,
    borderRadius: 5,
    color: "white",
  },
  button: {
    backgroundColor: "lightblue", // Actual background color for the button
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
