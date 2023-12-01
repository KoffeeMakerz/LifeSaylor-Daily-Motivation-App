import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/navigations/AppNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';



export default function App() {
  return (
     
    <SafeAreaProvider><AppContainer /></SafeAreaProvider>
    );
}
