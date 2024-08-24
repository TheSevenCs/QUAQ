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
  company: "MarmotTech",
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
          <Text style={styles.userText}>Company: {UserInfo.company}</Text>
          <Text style={styles.userText}>Position: {UserInfo.position}</Text>
        </View>

        <View style={styles.navBtnContainer}>
          <View style={styles.buttonWithTitle}>
            <TouchableOpacity
              style={styles.navBtn}
              onPress={() => navigation.navigate("Schedule")}
            ></TouchableOpacity>
            <View style={styles.btnTitleContainer}>
              <Text style={styles.btnTitle}>Schedule</Text>
            </View>
          </View>
          <View style={styles.buttonWithTitle}>
            <TouchableOpacity
              style={styles.navBtn}
              onPress={() => navigation.navigate("Jobs")}
            ></TouchableOpacity>
            <View style={styles.btnTitleContainer}>
              <Text style={styles.btnTitle}>Jobs</Text>
            </View>
          </View>
          <View style={styles.buttonWithTitle}>
            <TouchableOpacity
              style={styles.navBtn}
              onPress={() => navigation.navigate("Clients")}
            ></TouchableOpacity>
            <View style={styles.btnTitleContainer}>
              <Text style={styles.btnTitle}>Clients</Text>
            </View>
          </View>
          <View style={styles.buttonWithTitle}>
            <TouchableOpacity
              style={styles.navBtn}
              onPress={() => navigation.navigate("Equipment")}
            ></TouchableOpacity>
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
    height: 82,
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
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 5,
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
