import React, { useState } from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import { RadialGradient } from "react-native-gradients";
import CustomButton from "../Components/CustomButton";
import Flexbox2x6 from "../Components/GroupContainer";

const ScreenEquipment = () => {
  const [groupData, setGroupData] = useState([
    { title: "Group 1" },
    { title: "Group 2" },
    { title: "Group 3" },
    { title: "Group 1" },
    { title: "Group 2" },
  ]);

  const handleUpdateTitle = (updatedData) => {
    setGroupData(updatedData);
  };

  return (
    <View style={styles.container}>
      <RadialGradient
        x="50%"
        y="50%"
        rx="50%"
        ry="50%"
        colorList={colorList}
        style={styles.gradientBg}
      />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Equipment</Text>
        <Text style={styles.subtitle}>Groups</Text>
        <View style={styles.goldLine} />
      </View>

      <View style={styles.CDButtonsContainer}>
        <CustomButton
          imageSource={require("../assets/add.png")}
          backgroundColor="#000000"
          buttonStyle={styles.CDButton}
        />
        <CustomButton
          backgroundColor="#000000"
          buttonStyle={styles.CDButton}
          lineStyle={styles.deleteLine}
        />
      </View>

      <View style={styles.groupContainer}>
        <Flexbox2x6 data={groupData} onUpdateTitle={handleUpdateTitle} />
      </View>

      <View style={styles.deleteBtnContainer}>
        <CustomButton
          text="Delete"
          textStyle={styles.customText}
          backgroundColor="#000000"
          buttonStyle={styles.CDButton}
        />
      </View>

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
    alignItems: "center",
    backgroundColor: "transparent",
  },
  gradientBg: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  groupContainer: {
    width: "100%",
    bottom: 415,
  },
  title: {
    color: "white",
    fontSize: 33,
    backgroundColor: "black",
    textAlign: "center",
    width: "100%",
    paddingVertical: 25,
    paddingHorizontal: 20,
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
    height: 2,
    marginTop: 12,
    backgroundColor: "#D9AC6E",
    width: "100%",
  },
  CDButtonsContainer: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    bottom: 450,
    gap: 18,
    flexDirection: "row",
  },
  CDButton: {
    width: 109,
    height: 42,
  },
  deleteBtnContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    bottom: 70,
    gap: 18,
    flexDirection: "row",
  },
  deleteLine: {
    width: 20,
    height: 2,
    backgroundColor: "white",
  },
  customText: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "Segoe UI",
  },
});

export default ScreenEquipment;
