import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RadialGradient } from "react-native-gradients";

const UserInfo = {
  position: "Technician",
  company: "MarmotTechnologies Inc.",
};

const ScreenHome = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.banner}>
          <Image
            source={require("../assets/quaqbanner.png")}
            style={styles.bannerImg}
          />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userText} numberOfLines={1}>
            {UserInfo.company}
          </Text>
          <Text style={styles.userText}>{UserInfo.position}</Text>
        </View>

        <View style={styles.navBtnContainer}>
          <View style={styles.buttonWithTitle}>
            <TouchableOpacity
              style={styles.navBtn}
              onPress={() => navigation.navigate("PersonalSchedule")}
            >
              <Image
                source={require("../assets/schedule.png")}
                style={images.scheduleIcon}
              ></Image>
            </TouchableOpacity>
            <View style={styles.btnTitleContainer}>
              <Text style={styles.btnTitle}>Schedule</Text>
            </View>
          </View>
          <View style={styles.buttonWithTitle}>
            <TouchableOpacity
              style={styles.navBtn}
              onPress={() => navigation.navigate("Jobs")}
            >
              <Image
                source={require("../assets/jobs.png")}
                style={images.jobsIcon}
              ></Image>
            </TouchableOpacity>
            <View style={styles.btnTitleContainer}>
              <Text style={styles.btnTitle}>Jobs</Text>
            </View>
          </View>
          <View style={styles.buttonWithTitle}>
            <TouchableOpacity
              style={styles.navBtn}
              onPress={() => navigation.navigate("Clients")}
            >
              <Image
                source={require("../assets/clients.png")}
                style={images.clientIcon}
              ></Image>
            </TouchableOpacity>
            <View style={styles.btnTitleContainer}>
              <Text style={styles.btnTitle}>Clients</Text>
            </View>
          </View>
          <View style={styles.buttonWithTitle}>
            <TouchableOpacity
              style={styles.navBtn}
              onPress={() => navigation.navigate("Equipment")}
            >
              <Image
                source={require("../assets/equipment.png")}
                style={images.equipmentIcon}
              ></Image>
            </TouchableOpacity>
            <View style={styles.btnTitleContainer}>
              <Text style={styles.btnTitle}>Equipment</Text>
            </View>
          </View>
        </View>
      </View>
      <RadialGradient
        x="50%"
        y="50%"
        rx="50%"
        ry="50%"
        colorList={colorList}
        style={styles.gradientBg}
      />
      <StatusBar style="light" />
    </View>
  );
};

const colorList = [
  { offset: "0%", color: "#131313", opacity: "1" },
  { offset: "66.9%", color: "#2D2C2C", opacity: "1" },
  { offset: "100%", color: "#131313", opacity: "1" },
];

const images = StyleSheet.create({
  scheduleIcon: {
    top: 1,
    left: 2,
    height: 73,
    width: 70,
  },
  jobsIcon: {
    top: 1,
    left: 2,
    height: 60,
    width: 74,
  },
  clientIcon: {
    top: 1,
    left: 2,
    height: 63,
    width: 74,
  },
  equipmentIcon: {
    height: 69,
    width: 74,
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  banner: {
    top: 15,
    height: 165,
    width: 424,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerImg: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  gradientBg: {
    height: "100%",
    width: "100%",
    zIndex: -1,
    position: "absolute",
  },
  userInfo: {
    top: 5,
    height: 70,
    width: 320,
    backgroundColor: "black",
    borderColor: "#D9AC6E",
    borderWidth: 4,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  userText: {
    maxWidth: 290,
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 1,
  },
  navBtnContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center", // Center items horizontally
    alignItems: "center", // Center items vertically
    width: "100%",
    marginTop: 20, // Adjust spacing from other components
  },
  buttonWithTitle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    margin: 10, // Adjust spacing between buttons
    width: 129,
  },
  navBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderColor: "#D9AC6E",
    borderWidth: 4,
    borderRadius: 18,
    height: 100,
    width: 110,
  },
  btnTitleContainer: {
    width: 110,
    height: 35,
    borderWidth: 4,
    borderRadius: 18,
    backgroundColor: "black",
    borderColor: "#D9AC6E",
    justifyContent: "center", // Center text vertically
  },
  btnTitle: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default ScreenHome;
