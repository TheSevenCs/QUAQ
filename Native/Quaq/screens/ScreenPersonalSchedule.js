import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import styleCommon from "../styles/styleCommon";
// import { RadialGradient } from "react-native-gradients";

// IMPORT COMPONENTS
import {
  DateHeader,
  DateSelector,
  EditButtons,
  JobEntry,
} from "../components/personalSchedule";
import { NavBar, BackgroundGradient } from "../components/common";

const ScreenPersonalSchedule = () => {
  const navigation = useNavigation();

  const network_ip = "http://localhost";
  const router_port = ":5500";

  // STATE VARIABLES
  const [clients, setClients] = useState([]);

  // Automatically called when the component is loaded
  useEffect(() => {
    getClients();
  }, []);

  const testerDate1 = "2024/08/23";
  const testerDate2 = "2024/08/25";
  const testerDateRange1 = "2024/08/23 - 2024/08/23";

  // READ
  const getClients = async () => {
    console.log("FROM ScreenPersonalSchedule."); // TESTING
    try {
      const response = await axios.get(
        network_ip + router_port + "/personalScheduleFunc"
      );
      setClients(response.data);
      // console.log("response.data: ", response.data); // TESTING
      // console.log("response: ", response); // TESTING
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light" />

      {/* GRADIENT BACKGROUND */}
      <View style={styles.gradientContainer}>
        {/* <RadialGradient
          x="50%"
          y="50%"
          rx="50%"
          ry="50%"
          colorList={colorList}
          style={styles.gradientBg}
        /> */}
        <BackgroundGradient />
      </View>
      <View style={styles.testerBg}></View>

      {/* MAIN CONTENT */}
      <View style={styles.contentContainer}>
        <NavBar screenTitle={"Schedule"}></NavBar>

        <DateSelector date1={testerDate1} date2={testerDate2}></DateSelector>
        <View style={styles.goldLine}></View>

        <DateHeader date={testerDate1}></DateHeader>
        <JobEntry jobName={"JOB1"} startTime={"56 AM"}></JobEntry>

        <DateHeader date={"2024/08/24"}></DateHeader>
        <JobEntry
          jobName={
            "JOB2 when the text is too long MILKY RAY MILKY RAY MILKY RAY MILKY RAY MILKY RAY MILKY RAY MILKY RAY "
          }
          startTime={"56 AM"}
        ></JobEntry>
        <JobEntry jobName={"JOB3"} startTime={"56 AM"}></JobEntry>

        <EditButtons></EditButtons>
      </View>
    </View>
  );
};

const colorList = [
  { offset: "0%", color: "#131313", opacity: "1" },
  { offset: "66.9%", color: "#2D2C2C", opacity: "1" },
  { offset: "100%", color: "#131313", opacity: "1" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative", // Allows the content to be positioned over the gradient
    // backgroundColor: "transparent", // This makes the gradient not appear
  },
  gradientContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1, // Push the gradient behind everything else
  },
  gradientBg: {
    zIndex: -1,
    position: "absolute",
    // backgroundColor: "red",
  },
  contentContainer: {
    flex: 1, // Make the container take up the full screen
    justifyContent: "flex-start", // Start content at the top
    alignItems: "center", // Center content horizontally
    // paddingTop: StatusBar.currentHeight, // Add padding to avoid the status bar
  },
  title: {
    width: "100%",
    height: "10%",
    color: "white",
    backgroundColor: "black",
    fontSize: 33,
    // paddingVertical: 25,
    // paddingHorizontal: 20,
  },
  subtitle: {
    color: "white",
    backgroundColor: "black",
    width: 118,
    borderRadius: 19,
    textAlign: "center",
    paddingVertical: 4,
    paddingHorizontal: 10,
    overflow: "hidden",
    fontSize: 24,
    marginTop: 15,
  },
  goldLine: {
    height: 2, // Thickness of the line
    // marginTop: 12,
    backgroundColor: "#D9AC6E", // Color of the line
    width: "100%", // Full width of the container
  },
});

export default ScreenPersonalSchedule;
