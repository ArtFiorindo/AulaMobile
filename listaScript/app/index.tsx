import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../src/navigation/AppNavigator';


export default function App() {
  return (
    <NativeBaseProvider>
     
        <AppNavigator />
    
    </NativeBaseProvider>
  );
};