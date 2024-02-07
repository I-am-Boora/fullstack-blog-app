import {StyleSheet, Text, View, Alert, useColorScheme} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import LoginScreen from './screens/LoginScreen';
import {
  NavigationContainer,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
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
import {createStackNavigator} from '@react-navigation/stack';
import PostDetail from './screens/PostDetail';
import RegisterScreen from './screens/RegisterScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FollowerScreen from './screens/FollowerScreen';
import FollowingScreen from './screens/FollowingScreen';

const App = () => {
  const [user, setUser] = useState(null);
  const colorSchem = useColorScheme();
  const Bottom = createBottomTabNavigator();
  const Stack = createStackNavigator();
  const {colors} = useTheme();

  const TabBarIcon = ({focused, name, color, size}) => {
    return focused ? (
      <Icon name={name} color={color} size={size} />
    ) : (
      <Icon name={`${name}-outline`} color={'#00a2e3'} size={size} />
    );
  };

  function StackNavigation() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PostDetail"
          component={PostDetail}
          options={{tabBarVisible: false, headerShown: false}}
        />
      </Stack.Navigator>
    );
  }
  function BottomTabNavigator() {
    return (
      <Bottom.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colorSchem === 'dark' ? '#001219' : 'white',
            width: '100%',
            borderTopColor: colorSchem === 'dark' ? '#00a2e3' : 'grey',
          },
          tabBarIconStyle: {
            // marginTop: 3,
          },
          tabBarLabelStyle: {
            paddingBottom: 2,
            fontWeight: '500',
            color: '#00a2e3',
          },
        }}>
        <Bottom.Screen
          name="Home"
          component={StackNavigation}
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

  const getInitialRoute = async () => {
    const token = await AsyncStorage.getItem('authToken');

    if (token) {
      return 'Main';
    } else {
      return 'Login';
    }
  };

  return (
    <UserContextProvider>
      <NavigationContainer
        theme={colorSchem === 'dark' ? darkTheme : lightTheme}>
        <Stack.Navigator
          initialRouteName={getInitialRoute()}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Main" component={BottomTabNavigator} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="PostDetail" component={PostDetail} />
          <Stack.Screen name="Follower" component={FollowerScreen} />
          <Stack.Screen name="Following" component={FollowingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
