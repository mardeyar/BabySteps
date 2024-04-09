import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { profileSetup, memorySetup } from './database/DatabaseManager';

import Memory from './views/Pages/Memory';
import MainPage from './views/Pages/MainPage';
import SettingsPage from './views/Pages/Settings';
import CustomTitle from './components/HeaderTitle';

import { AppColor } from './views/styles/Global';

const Tab = createBottomTabNavigator();

export default function App() {

  // Need to run the setup methods from DB manager to create tables if they don't exist
  useEffect(() => {
    profileSetup();
    memorySetup();
  }, []);

  return (
      <NavigationContainer theme={AppColor}>
      <Tab.Navigator>
        <Tab.Screen 
          name="Home" 
          component={MainPage} 
          options={{
            headerStyle: {
              backgroundColor: '#EAEEEF',
            },
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='home' color={color} size={size} />
            ),
            title: 'Babysteps',
            headerTitle: () => <CustomTitle title='Babysteps' />,
            headerTitleAlign: 'left',
          }}
          />
        <Tab.Screen 
          name="Add Memory" 
          component={Memory} 
          options={{
            headerStyle: {
              backgroundColor: '#EAEEEF',
            },
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='add-circle-outline' color={color} size={size} />
            ),
          }}
          />
        <Tab.Screen 
          name="Settings Page" 
          component={SettingsPage} 
          options={{
            headerStyle: {
              backgroundColor: '#EAEEEF',
            },
            headerShown: false,
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='settings' color={color} size={size} />
            ),
            }}/>
      </Tab.Navigator>
      <StatusBar style='dark' />
    </NavigationContainer>
  );
}