import {StyleSheet, Text, View, Alert, useColorScheme} from 'react-native';
import React, {useContext, useState} from 'react';
import LoginScreen from './screens/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './navigation/StackNavigation';
import {darkTheme, lightTheme} from './src/utils/theme';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import SavedScreen from './screens/SavedScreen';
import ProfileScreen from './screens/ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  userContext,
  UserContextProvider,
} from './src/utils/UserContextProvider';

const App = () => {
  const colorSchem = useColorScheme();
  const Bottom = createBottomTabNavigator();
  const TabBarIcon = ({focused, name, color, size}) => {
    return focused ? (
      <Icon name={name} color={color} size={size} />
    ) : (
      <Icon name={`${name}-outline`} color={color} size={size} />
    );
  };
  function BottomTabNavigator() {
    return (
      <Bottom.Navigator
        screenOptions={{
          tabBarStyle: {
            borderRadius: 10,
            backgroundColor: 'white',
            width: '95%',
            alignSelf: 'center',
            marginBottom: 10,
            borderTopColor: 'white',
            height: 60,
          },
          tabBarIconStyle: {
            marginTop: 3,
          },
          tabBarLabelStyle: {
            paddingBottom: 5,
            fontWeight: '500',
          },
        }}>
        <Bottom.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused, color, size}) => (
              <TabBarIcon
                name="home"
                focused={focused}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Bottom.Screen
          name="Post"
          component={PostScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused, color, size}) => (
              <TabBarIcon
                name="add-circle"
                focused={focused}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Bottom.Screen
          name="Saved"
          component={SavedScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <TabBarIcon
                name="heart"
                focused={focused}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Bottom.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused, color, size}) => (
              <TabBarIcon
                name="person"
                focused={focused}
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Bottom.Navigator>
    );
  }
  return (
    <UserContextProvider>
      <NavigationContainer
        theme={colorSchem === 'dark' ? darkTheme : lightTheme}>
        {/* <StackNavigation /> */}
        <BottomTabNavigator />
      </NavigationContainer>
    </UserContextProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
