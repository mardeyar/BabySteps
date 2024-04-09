import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { SettingsCard, SettingsContainer } from "../styles/Settings";

import Disclaimer from "./Disclaimer";
import Profile from "./Profile";
import CreateProfile from "./CreateProfile";
import EditProfile from "./EditProfile";
import About from "./About";

const Stack = createStackNavigator();
const ProfileStack = createStackNavigator();

const SettingsPage = () => {

const [isDarkMode, setIsDarkMode] = useState(false);

const toggleDarkMode = () => {
  // Add the logic here to switch themes when time permits
}

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
            headerStyle: {
              backgroundColor: '#EAEEEF',
            }
          }}/>
      <Stack.Screen 
        name="Create Profile" 
        component={CreateProfile} 
        options={{
            headerStyle: {
              backgroundColor: '#EAEEEF',
            }
          }}
        />
      <Stack.Screen 
        name="Disclaimer" 
        component={Disclaimer} 
        options={{
            headerStyle: {
              backgroundColor: '#EAEEEF',
            }
          }}
        />
      <Stack.Screen 
        name="Profile" 
        component={ProfileStackScreen} 
        options={{
            headerStyle: {
              backgroundColor: '#EAEEEF',
            }
          }}
        />
      <Stack.Screen 
        name="About" 
        component={About} 
        options={{
            headerStyle: {
              backgroundColor: '#EAEEEF',
            }
          }}
        />
    </Stack.Navigator>
  );
};

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen 
        name="ProfileScreen" 
        component={Profile}
        />
      <ProfileStack.Screen 
        name="Edit Profile" 
        component={EditProfile} 
        />
    </ProfileStack.Navigator>
  )
}

const SettingsScreen = ({ isDarkMode, toggleDarkMode }) => {

  const navigation = useNavigation();
  return (
    <View style={SettingsContainer.body}>
    <Text style={SettingsContainer.label}>User Settings</Text>
      <View style={SettingsContainer.containerStyle}>
        <TouchableOpacity style={SettingsCard.cardStyle} onPress={() => navigation.navigate("Create Profile")} >
          <Text>Create Profile</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#5A5A5A" />
        </TouchableOpacity>

        <View style={SettingsCard.separator}></View>

        <TouchableOpacity style={SettingsCard.cardStyle} onPress={() => navigation.navigate("Profile")} >
          <Text>View Profile</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#5A5A5A" />
        </TouchableOpacity>
      </View>
      
      <Text style={SettingsContainer.label}>Information</Text>
      <View style={SettingsContainer.containerStyle}>
        <TouchableOpacity style={SettingsCard.cardStyle} onPress={() => navigation.navigate("About")} >
          <Text>About</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#5A5A5A" />
        </TouchableOpacity>

        <View style={SettingsCard.separator}></View>

        <TouchableOpacity style={SettingsCard.cardStyle} onPress={() => navigation.navigate("Disclaimer")} >
          <Text>App Disclaimer</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#5A5A5A" />
        </TouchableOpacity>
      </View>

      <Text style={SettingsContainer.label}>Appearance</Text>
      <View style={SettingsContainer.containerStyle}>
        <View style={SettingsCard.cardStyle} onPress={() => navigation.navigate("Disclaimer")} >
          <Text>Dark/Light Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
          />
        </View>
      </View>
      
    </View>
  );
};

export default SettingsPage;
