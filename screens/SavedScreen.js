import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState, useTransition} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostSaveComponent from '../src/component/PostSaveComponent';
import {useNavigation} from '@react-navigation/native';
import PostComponent from '../src/component/PostComponent';
import {calculateTimeAgo} from '../src/utils/utilityFunction';
import {userContext} from '../src/utils/UserContextProvider';

const SavedScreen = () => {
  const [allPost, setAllPost] = useState([]);
  const {loginInfo} = useContext(userContext);
  const navigation = useNavigation();
  // const getSavedPosts = async () => {
  //   try {
  //     const userId = await AsyncStorage.getItem('userId');
  //     await axios
  //       .post(`http://10.0.2.2:8080/users/getSavedPosts/${userId}`)
  //       .then(response => {
  //         if (response.data) {
  //           setAllPost(response.data);
  //           // console.log(response.data);
  //         } else {
  //           console.log('Error: Invalid response data format');
  //         }
  //       });
  //   } catch (error) {
  //     console.log('Error getting saved posts', error);
  //   }
  // };
  // useEffect(() => {
  //   getSavedPosts();
  // }, []);
  return (
    <View>
      {loginInfo?.user?.savedPost &&
        loginInfo?.user?.savedPost.map((item, index) => {
          return (
            <PostComponent
              item={item}
              navigation={navigation}
              key={index}
              calculateTimeAgo={calculateTimeAgo}
            />
          );
        })}
    </View>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({});
