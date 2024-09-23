// IMPORT REACT
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

// IMPORT COMMON STYLES
import styleCommon from "../styles/styleCommon";

// IMPORT COMPONENTS
import {
  DateHeader,
  DateSelector,
  EditButtons,
  JobEntry,
} from "../components/personalSchedule";
import { NavBar, BackgroundGradient } from "../components/common";
import CustomButton from "../components/CustomButton";

// IMPORT AXIOS
import axios from "axios";

const ScreenPersonalSchedule = () => {
  console.log("ScreenPersonalSchedule.js ENTERED.");

  const navigation = useNavigation();

  // NETOWRKING CONSTANTS
  const network_ip = "http://localhost";
  const router_port = ":5500";

  // STATE VARIABLES
  const [groupedJobsData, setGroupedJobsData] = useState([]); // TRACK JOBS DATA
  const [isLoading, setIsLoading] = useState(true); // TRACK PAGE LOADING STATE

  // TESTING
  const testerDate1 = "2024/08/25";
  const testerDate2 = "2024/08/31";
  const testerDateRange1 = "2024/08/23 - 2024/08/23";

  // Automatically called when component is loaded
  useEffect(() => {
    const fetchData = async () => {
      await fetchAndGroupJobs(); // Call async function
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("UPDATED GROUPED JOBS", groupedJobsData);
  }, [groupedJobsData]);

  // DATABSE CALL, return: null
  // Takes the jobsData which is formatted as an array of objects,
  // and converts it to a dictionary where the dates are the keys.
  // return: null and setGroupedJobsData(groupedJobs)
  const fetchAndGroupJobs = async () => {
    setIsLoading(true); // LOADING ICON STATE

    try {
      // response contains all elems of the request; config, data, status, ...
      const response = await axios.get(
        network_ip + router_port + "/personalScheduleFunc",
        {
          params: {
            company_id: "056",
            employee_id: "9565656565656",
            startDate: "2024/08/25",
            // endDate: "2024/08/31",
            endDate: "2024/09/01",
          },
        }
      );
      // use response.data

      // Now group the jobs by date:
      const groupedJobs = {}; // STORES DICTIONARY WITH KEY: YYYY/MM/DD
      response.data.forEach((job) => {
        // Extract date from jobDate_job_id (YYYYMMDD_part)
        const jobDate = job.jobDate_job_id.split("_")[0];
        const formattedDate = `${jobDate.slice(0, 4)}/${jobDate.slice(
          4,
          6
        )}/${jobDate.slice(6, 8)}`; // Format to YYYY/MM/DD

        // Group jobs by date
        if (!groupedJobs[formattedDate]) {
          groupedJobs[formattedDate] = [];
        }
        groupedJobs[formattedDate].push(job);
      });

      setGroupedJobsData(groupedJobs); // SET AS STATE
      setIsLoading(false); // UNLOAD LOADING ICON
    } catch (error) {
      console.error(
        "FROM ScreenPersonalSchedule > fetchAndGroupJobs(), ERROR GETTING JOBS:",
        error
      );
    }
  };

  try {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light" />
        {/* GRADIENT BACKGROUND */}
        <View style={styles.gradientContainer}>
          <BackgroundGradient />
        </View>
        <View style={styles.testerBg}></View>
        {/* MAIN CONTENT */}
        <View style={styles.contentContainer}>
          {/* BOTH ELEMS AND EDIT BUTTONS: FLEX: 1 */}
          <NavBar screenTitle={"Schedule"} />
          <DateSelector date1={testerDate1} date2={testerDate2}></DateSelector>
          {/* MAIN BODY */}
          <View style={styles.containerAllJobs}>
            {/* RENDER DYNAMIC COMPONENTS */}
            {isLoading ? (
              <ActivityIndicator size="large" color="#D9AC6E" />
            ) : (
              Object.keys(groupedJobsData).map((date) => (
                <View key={date} style={styles.containerDate}>
                  <DateHeader date={date} />

                  {groupedJobsData[date].map((job, index) => (
                    <View key={index} style={styles.containerJob}>
                      <JobEntry jobName={job.jobName} startTime={job.jobTime} />
                    </View>
                  ))}
                </View>
              ))
            )}
          </View>
          <EditButtons />
        </View>
      </View>
    );
  } catch (error) {
    console.log("FROM ScreenPersonalSchedule.js, ERROR:", error);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative", // Allows the content to be positioned over the gradient
    // backgroundColor: "transparent", // This makes the gradient not appear
    width: "100%",
    height: "100%",
    maxHeight: Dimensions.get("window").height,
  },
  containerAllJobs: {
    flex: 7,
    width: "100%",
    alignItems: "center",
    overflow: "scroll",
  },
  containerDate: {
    width: "100%",
  },
  containerJob: {
    width: "100%",
    alignItems: "center",
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
