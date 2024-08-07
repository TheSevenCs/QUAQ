import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";

const ScreenClients = () => {
  const navigation = useNavigation();

  // DATABASE FUNCTIONS
  const createClient = async () => {
    try {
      const response = await axios.post(
        // UDPATE THIS LINK
        "http://192.168.0.124:5500/clients",
        {},
        {
          params: {
            company_id: "001",
            newFirstName: "John",
            newLastName: "Doe",
            newEmail: "johndoe@example.com",
            newPhone: "123-456-7890",
            newDate: "2024-08-03", // <YYYY-MM-DD>
            newClientActive: true,
            newWebsite: "http://www.example.com",
            newAddress: "123 Street Street",
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
  const getClients = async () => {
    try {
      const response = await axios.get("/clients");
      return response;
    } catch (error) {
      console.log("FROM ScreenClients.js, ERROR GETTING Clients: ", error);
    }
  };
  const updateClient = async () => {
    try {
    } catch (error) {
      console.log("FROM ScreenClients.js, ERROR UPDATING Client: ", error);
    }
  };
  const deleteClient = async () => {
    try {
    } catch (error) {
      console.log("FROM ScreenClients.js, ERROR DELETING Client: ", error);
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
