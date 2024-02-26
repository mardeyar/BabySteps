import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { initialSetup, createProfile, checkData } from './database/DatabaseManager';

import Information from './views/FirstRun/Information';
import PhotoInput from './views/FirstRun/PhotoInput';
import Disclaimer from './views/FirstRun/Disclaimer';
import MainPage from './views/Main/MainPage';


export default function App() {
  // Initialize these boolean methods to false at start, changing to true once the conditions are met
  const [babyProfileExists, setBabyProfileExists] = useState(false);
  const [initialSetupComplete, setInitialSetupComplete] = useState(false);

  useEffect(() => {
    initialSetup();
    setInitialSetupComplete(true);
  }, []);

  useEffect(() => {
    if (initialSetupComplete) {
      checkData((result) => {
        if (result.length > 0) {
          // Baby profile exists, no need to run initial setup
          setBabyProfileExists(true);
        }
      });
    }
  }, [initialSetupComplete]);

  return (
    <>
      {babyProfileExists ? (
        // Render the main app page if baby profile exists
        <MainPage />
      ) : (
        // Render initial setup if not
        <>
          <Information />
          <PhotoInput />
          <Disclaimer />
        </>
      )}
    </>
  );
}

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Here is my app</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#01d68b',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });