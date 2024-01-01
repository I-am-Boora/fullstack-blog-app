import {StyleSheet, Text, View, Alert, useColorScheme} from 'react-native';
import React, {useState} from 'react';
import LoginScreen from './screens/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './navigation/StackNavigation';
import {darkTheme, lightTheme} from './src/utils/theme';
const App = () => {
  const colorSchem = useColorScheme();
  console.log(colorSchem);
  return (
    <NavigationContainer theme={colorSchem === 'dark' ? darkTheme : lightTheme}>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
