import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";

const ScreenClients = () => {
  const navigation = useNavigation();

  const handlePress = async () => {
    console.log("METHOD CALLED");

    try {
      const response = await axios.post(
        "http://192.168.248.146:5500/clients",
        {},
        {
          params: { newName: "tester1", newDate: "tester1" },
        }
      );
      console.log("FROM ScreenClients.js, RESPONSE: ", response.data);
    } catch (error) {
      console.error(
        "FROM ScreenClients.js, ERROR CREATING RANDOM Client: ",
        error
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text>Clients Screen</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Go to Home Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => handlePress()}
      >
        <Text style={styles.buttonText}>POST TO DATABASE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ScreenClients;
