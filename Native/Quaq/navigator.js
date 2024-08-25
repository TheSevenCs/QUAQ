// import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ScreenHome, ScreenClients, ScreenPersonalSchedule } from "./screens";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="PersonalSchedule"
      screenOptions={{ headerShown: false }} // Hides default ugly header banner
    >
      <Stack.Screen name="Home" component={ScreenHome} />
      <Stack.Screen name="Clients" component={ScreenClients} />
      <Stack.Screen
        name="PersonalSchedule"
        component={ScreenPersonalSchedule}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
