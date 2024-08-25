import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const DateHeader = ({ date }) => {
  // RETURNS STRING FOR DAY (Monday, Tuesday, ...)
  const getDayOfWeek = (dateString) => {
    // For slice(), param 1 is inclusive, param 2 is exclusive
    const year = dateString.slice(0, 4); // Characters from index 0 to 3
    const month = dateString.slice(5, 7); // Characters from index 5 to 6
    const day = dateString.slice(8, 10); // Characters from index 8 to 9

    // months use 0 base index, days use 1 base index
    const date = new Date(year, month - 1, day);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // getDay() returns number from 0-6
    return daysOfWeek[date.getDay()];
  };

  const dayOfWeek = getDayOfWeek(date); // Monday, Tuesday, ...
  const displayDate = date.slice(5, 10); // MM/DD

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.dateText}>{`${dayOfWeek} - ${displayDate}`}</Text>
      <View style={styles.line} />
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center", // vertical
    justifyContent: "space-between", // horizontal
    width: "100%",
  },
  dateText: {
    color: "white",
    // textAlign: "center",
    fontSize: 25,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  line: {
    flex: 1, // Make the lines fill the available space
    height: 1,
    backgroundColor: "#D9AC6E",
  },
});

export default DateHeader;
