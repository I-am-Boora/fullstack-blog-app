import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userContext} from '../utils/UserContextProvider';

const FollowerContainer = ({item, index}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [userID, setuserID] = useState('null');
  const [isFollow, setIsFollow] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const {colors} = useTheme();
  const {loginInfo} = useContext(userContext);
  const {setFollowingCount} = useContext(userContext);

  const handleFollowUser = async targetUserId => {
    try {
      await axios
        .post(`http://10.0.2.2:8080/users/follow/${userID}/${targetUserId}`)
        .then(response => {
          if (response.data) {
            // const updatedFollowings = response.data.followings;
            // setIsFollow(updatedFollowings);
            // console.log(response.data);
            // setAllUser(updatedFollowings);
            setIsClicked(true);
            setFollowingCount(response.data.followings.length);

            // console.log(updatedFollowings);
          }
        })
        .catch(error => {
          console.log('error handling follow', error);
        });
    } catch (error) {
      console.log('error getting follow user', error);
    }
  };
  const handleUnfollowUser = async targetUserId => {
    try {
      await axios
        .post(`http://10.0.2.2:8080/users/unFollow/${userID}/${targetUserId}`)
        .then(response => {
          if (response.data) {
            // const updatedFollowings = response.data.followings;
            // setIsFollow(updatedFollowings);
            // console.log(response.data);
            // setAllUser(updatedFollowings);
            setIsClicked(false);
            setFollowingCount(response.data.followings.length);

            // console.log(updatedFollowings);
          }
        })
        .catch(error => {
          console.log('error handling follow', error);
        });
    } catch (error) {
      console.log('error getting follow user', error);
    }
  };

  useEffect(() => {
    const getUserId = async () => {
      const userId = await AsyncStorage.getItem('userId');

      setuserID(userId);
      if (loginInfo?.user?.followings.includes(item._id)) {
        setIsClicked(true);
      } else {
        setIsClicked(false);
      }
      // if (!userId) {
      //   console.log("userID doesn't exists!!");
      //   return;
      // }
    };
    getUserId();
    console.log('isclickd', isClicked);
  }, []);
  // if (allUser) {
  //   console.log(allUser);
  // }
  // console.log(userID);
  return (
    <View
      style={[
        styles.allUsersContainer,
        {backgroundColor: colors.secondaryBackground},
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={styles.imageContainer}>
          {item?.avatar ? (
            <Image
              source={{
                uri: item?.avatar,
              }}
              style={styles.avatar}
            />
          ) : (
            <Image
              source={require('../assets/images/blank-profile.png')}
              style={styles.avatar}
            />
          )}

          <View style={styles.userInfoContainer}>
            <Text
              style={{
                fontSize: moderateScale(16),
                fontWeight: '500',
                textTransform: 'capitalize',
                color: colors.text,
              }}>
              {item?.fullName}
            </Text>
            <Text style={{fontSize: moderateScale(14)}}>{item?.username}</Text>
          </View>
        </View>
        {/* {console.log(loginInfo.user.followings[index])} */}
        {isClicked ? (
          <Pressable
            style={[styles.followContainer, {borderColor: '#7ab317'}]}
            onPress={() => {
              handleUnfollowUser(item._id);
            }}>
            <Text
              style={{
                fontSize: moderateScale(16),
                color: '#7ab317',
              }}>
              following
            </Text>
          </Pressable>
        ) : (
          <Pressable
            style={[styles.followContainer, {borderColor: 'grey'}]}
            onPress={() => {
              handleFollowUser(item._id);
            }}>
            <Text
              style={{
                fontSize: moderateScale(16),
                color: colors.text,
              }}>
              follow
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default FollowerContainer;

const styles = StyleSheet.create({
  allUsersContainer: {
    justifyContent: 'space-between',
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(15),
    paddingHorizontal: scale(5),
    marginVertical: verticalScale(5),
  },
  imageContainer: {flexDirection: 'row', columnGap: 10},
  avatar: {
    width: scale(40),
    height: verticalScale(40),
    borderRadius: moderateScale(40),
    resizeMode: 'cover',
  },
  followContainer: {
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(100),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(3),
  },
});
