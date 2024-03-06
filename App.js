import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { profileSetup, disclaimerCheckSetup, checkData, milestoneSetup } from './database/DatabaseManager';

import CreateProfile from './views/Pages/CreateProfile';
import MainPage from './views/Pages/MainPage';
import SettingsPage from './views/Pages/Settings';

const Tab = createBottomTabNavigator();

export default function App() {

  // Need to run the setup methods from DB manager to create tables if they don't exist
  useEffect(() => {
    profileSetup();
    milestoneSetup();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Home" 
          component={MainPage} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='home' color={color} size={size} />
            ),
          }}
          />
        <Tab.Screen name="Milestone" component={CreateProfile} />
        <Tab.Screen 
          name="Settings Page" 
          component={SettingsPage} 
          options={{
            headerShown: false,
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='settings' color={color} size={size} />
            ),
            }}/>
      </Tab.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>
  );
}