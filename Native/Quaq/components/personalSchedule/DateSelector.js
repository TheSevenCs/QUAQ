// Would like to add a function where pressing on the date itself,
// will bring up a calendar where the new date (and subsquently range)
// can be selected for display.

import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, Pressable } from "react-native";

const DateSelector = ({
  date1,
  date2,
  pressedPreviousDate,
  pressedNextDate,
}) => {
  const formatDate = (date1, date2) => {
    const formattedDate1 = date1.slice(5, 10);
    const formattedDate2 = date2.slice(5, 10);

    const formattedDate = formattedDate1 + " - " + formattedDate2;
    return formattedDate;
  };

  const formattedDate = formatDate(date1, date2);

  try {
    return (
      <View style={styles.container}>
        <View style={styles.containerSelect}>
          <Pressable onPress={pressedPreviousDate}>
            <Text style={styles.arrowText}>{"<"}</Text>
          </Pressable>

          <Text style={styles.dateText}>{formattedDate}</Text>

          <Pressable onPress={pressedNextDate}>
            <Text style={styles.arrowText}>{">"}</Text>
          </Pressable>
        </View>
        <View style={styles.line} />
      </View>
    );
  } catch (error) {
    console.log("FROM DataSelector.js:", error);
  }
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  containerSelect: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    // maxWidth: "100%",
  },
  dateText: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
    // paddingVertical: 20,
    // paddingHorizontal: 15,
    fontFamily: "Selawik-Semilight",
  },
  arrowText: {
    color: "#D9AC6E",
    fontSize: 35,
    marginBottom: 5,
    fontFamily: "Selawik-Semilight",
  },
  line: {
    height: 2,
    backgroundColor: "#D9AC6E",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
});

export default DateSelector;
