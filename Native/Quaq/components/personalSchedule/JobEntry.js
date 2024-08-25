import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const JobEntry = ({ jobName, startTime }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle} numberOfLines={1}>
        {jobName}
      </Text>

      <View style={styles.containerStart}>
        <Text style={styles.textStart} numberOfLines={1}>
          Start Time
        </Text>
        <View style={styles.line}></View>
        <Text style={styles.textTime} numberOfLines={1}>
          {startTime}
        </Text>
      </View>
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
    justifyContent: "space-between", // horizontal space

    marginTop: 15, // only margin top on all components
  },
  containerStart: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",

    // marginRight: 12.5,
    marginRight: "4%",
    maxWidth: "25%",
  },
  textTitle: {
    color: "white",
    fontSize: 27.5,
    fontFamily: "Selawik-Semilight",

    // marginLeft: 12.5,
    marginLeft: "4%",
    maxWidth: "60%",

    maxHeight: "50%",
  },
  textStart: {
    color: "white",
    fontSize: 15,
    fontFamily: "Selawik-Semilight",
  },
  textTime: {
    color: "white",
    fontSize: 22.5,
    fontFamily: "Selawik-Semilight",
  },
  line: {
    height: 1,
    backgroundColor: "white",
    width: "100%",
  },
});

export default JobEntry;
