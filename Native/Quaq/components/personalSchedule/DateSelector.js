// Would like to add a function where pressing on the date itself,
// will bring up a calendar where the new date (and subsquently range)
// can be selected for display.

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const DateSelector = ({
  date1,
  date2,
  pressedPreviousDate,
  pressedNextDate,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pressedPreviousDate}>
        <Text style={styles.arrowText}>{"<"}</Text>
      </TouchableOpacity>

      <Text style={styles.dateText}>
        {date1} - {date2}
      </Text>

      <TouchableOpacity onPress={pressedNextDate}>
        <Text style={styles.arrowText}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // maxWidth: "100%",
  },
  dateText: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  arrowText: {
    color: "#D9AC6E",
    fontSize: 35,
    marginBottom: 5,
  },
});

export default DateSelector;
