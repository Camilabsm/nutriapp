import React, { useEffect, useState } from 'react';
import { initializeDatabase } from './utils/Database';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { ActivityIndicator, View } from 'react-native';
import AuthStackNavigator from './navigation/AuthStackNavigator';
import { SQLiteProvider } from 'expo-sqlite';


const App: React.FC = () => {

  return (
    <SQLiteProvider databaseName='nutriapp.db' onInit={initializeDatabase}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SQLiteProvider>
  );
};

export default App;
