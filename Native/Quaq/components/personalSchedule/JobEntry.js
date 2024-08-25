import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const JobEntry = ({ jobName, startTime }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{jobName}</Text>
      <Text style={styles.dateText}>Start Time: {startTime}</Text>
    </View>
  );
};

const { width } = Dimensions.get("window");
const goldColour = "#D9AC6E";

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "10%",
    backgroundColor: "black",
    borderColor: goldColour,
    borderWidth: 2,
    borderRadius: 8,

    flexDirection: "row",
    alignItems: "center", // vertical
    justifyContent: "center", // horizontal space

    marginTop: 15, // only margin top on all components
  },
  dateText: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
    paddingHorizontal: 15,
    fontFamily: "Selawik-Semilight",
  },
  line: {
    flex: 1, // Make the lines fill the available space
    height: 1,
    backgroundColor: "#D9AC6E",
  },
});

export default JobEntry;
