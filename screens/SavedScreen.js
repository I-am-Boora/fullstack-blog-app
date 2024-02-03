import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SavedScreen = () => {
  const [allPost, setAllPost] = useState([]);
  const getSavedPosts = async () => {
    const userId = await AsyncStorage.getItem('userId');
    await axios
      .post(`http://10.0.2.2:8080/users/getSavedPosts/${userId}`)
      .then(response => {
        setAllPost(response.data);
        console.log(response.data.savedPost);
      })
      .catch(error => {
        console.log('Error getting saved posts', error);
      });
  };
  useEffect(() => {
    getSavedPosts();
  }, []);
  console.log(allPost);
  return (
    <View>
      <Text>SavedScreen</Text>
    </View>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({});
