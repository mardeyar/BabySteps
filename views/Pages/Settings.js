import React from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from '@react-navigation/native';
import Disclaimer from "./Disclaimer";
import Profile from "./Profile";
import CreateProfile from "./CreateProfile";

const Stack = createStackNavigator();

const SettingsPage = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Create Profile" component={CreateProfile} />
      <Stack.Screen name="Disclaimer" component={Disclaimer} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

const SettingsScreen = () => {

  const navigation = useNavigation();
  return (
    <View>
      <Button
        title="Create Profile"
        onPress={() => navigation.navigate("Create Profile")}
      />
      <Button
        title="Disclaimer"
        onPress={() => navigation.navigate("Disclaimer")}
      />
      <Button
        title="Profile"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
};

export default SettingsPage;
