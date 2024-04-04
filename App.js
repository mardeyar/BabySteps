import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { profileSetup, memorySetup } from './database/DatabaseManager';
import { useFonts } from 'expo-font';

import Memory from './views/Pages/Memory';
import MainPage from './views/Pages/MainPage';
import SettingsPage from './views/Pages/Settings';

import { HeaderStyle, AppColor } from './views/styles/Global';

const Tab = createBottomTabNavigator();

export default function App() {

  // Decalre the fonts the app will use
  const [fontsLoaded] = useFonts({
    'Urbanist': require('./assets/fonts/Urbanist.ttf'),
    'NotoSans': require('./assets/fonts/NotoSans.ttf'),
    'LatoBold': require('./assets/fonts/LatoBold.ttf'),
    'LatoLight': require('./assets/fonts/LatoLight.ttf'),
    'LatoRegular': require('./assets/fonts/LatoRegular.ttf'),
    'LatoThin': require('./assets/fonts/LatoThin.ttf'),
    'Carrois': require('./assets/fonts/Carrois.ttf')
  });

  // Need to run the setup methods from DB manager to create tables if they don't exist
  useEffect(() => {
    profileSetup();
    memorySetup();
  }, []);

  // Wait briefly to allow font loading
  if (!fontsLoaded) {
    return null;
  }

  return (
      <NavigationContainer theme={AppColor}>
      <Tab.Navigator>
        <Tab.Screen 
          name="Home" 
          component={MainPage} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='home' color={color} size={size} />
            ),
            title: 'Babysteps',
            headerTitleStyle: HeaderStyle.text,
            headerTitleAlign: 'left',
            headerTintColor: '#9FB7B9'
          }}
          />
        <Tab.Screen 
          name="Add Memory" 
          component={Memory} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='add-circle-outline' color={color} size={size} />
            ),
          }}
          />
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