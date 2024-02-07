import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FollowerContainer from '../src/component/FollowerContainer';

const FollowerScreen = () => {
  const [activeButton, setActiveButton] = useState('Followers');
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsersInfo = useCallback(async () => {
    const userId = await AsyncStorage.getItem('authToken');
    await axios
      .post(`http://10.0.2.2:8080/users/getAllUsers/${userId}`)
      .then(response => {
        if (response.data) {
          setAllUsers(response.data);
          console.log(response.data);
        }
      })
      .catch(error => {
        console.log('Error fetching all the users', error);
      });
  });
  useEffect(() => {
    getAllUsersInfo();
  }, []);

  const handlePress = async buttonName => {
    setActiveButton(buttonName);
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 10}}>
      <View style={styles.btnContainer}>
        <Pressable
          style={[
            styles.btn,
            {
              backgroundColor:
                activeButton === 'Followers' ? 'black' : '#eeeeee',
            },
          ]}
          onPress={() => handlePress('Followers')}>
          <Text
            style={[
              styles.headerText,
              {color: activeButton === 'Followers' ? 'white' : 'black'},
            ]}>
            Followers
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.btn,
            {
              backgroundColor:
                activeButton === 'Followings' ? 'black' : '#eeeeee',
            },
          ]}
          onPress={() => handlePress('Followings')}>
          <Text
            style={[
              styles.headerText,
              {color: activeButton === 'Followings' ? 'white' : 'black'},
            ]}>
            Followings
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.btn,
            {backgroundColor: activeButton === 'All' ? 'black' : '#eeeeee'},
          ]}
          onPress={() => handlePress('All')}>
          <Text
            style={[
              styles.headerText,
              {color: activeButton === 'All' ? 'white' : 'black'},
            ]}>
            All
          </Text>
        </Pressable>
      </View>
      {activeButton === 'All' ? (
        <View style={styles.allBtnContainer}>
          {allUsers &&
            allUsers?.map((item, index) => {
              return <FollowerContainer item={item} key={index} />;
            })}
        </View>
      ) : null}
    </View>
  );
};

export default FollowerScreen;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 10,
  },
  btn: {
    borderRadius: 15,
    marginTop: 20,
    height: 40,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  allBtnContainer: {},
});
