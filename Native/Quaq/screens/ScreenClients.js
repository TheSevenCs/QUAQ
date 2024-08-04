import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";

const ScreenClients = () => {
  const navigation = useNavigation();

  const handlePress = async () => {
    try {
      const response = await axios.post(
        // UDPATE THIS LINK
        "http://192.168.0.124:5500/clients",
        {},
        {
          params: {
            clientFirstName: "John",
            clientLastName: "Doe",
            clientEmail: "johndoe@example.com",
            clientPhone: "123-456-7890",
            clientDate: "2024-08-03", // Format is currently unspecified
            clientStatus: "true", // Boolean value for status
            clientWebsite: "http://www.example.com",
            clientAddress: "123 Street Street",
          },
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
