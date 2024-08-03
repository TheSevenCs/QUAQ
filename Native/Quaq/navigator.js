import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ScreenHome, ScreenClients } from "./screens";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={ScreenHome} />
      <Stack.Screen name="Clients" component={ScreenClients} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
