import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userContext} from '../utils/UserContextProvider';

const FollowerContainer = ({item}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isFollow, setIsFollow] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const {colors} = useTheme();
  const {loginInfo} = useContext(userContext);
  const {setFollowingCount} = useContext(userContext);

  const handleFollow = async targentUserId => {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      console.log("userID doesn't exists!!");
      return;
    }
    if (!isClicked) {
      try {
        await axios
          .post(`http://10.0.2.2:8080/users/follow/${userId}/${targentUserId}`)
          .then(response => {
            if (response.data) {
              const updatedFollowings = response.data.followings;
              // setIsFollow(updatedFollowings);
              setAllUser(updatedFollowings);
              setFollowingCount(response.data.followings.length);
              setIsClicked(!isClicked);
              // console.log(updatedFollowings);
            }
          })
          .catch(error => {
            console.log('error handling follow', error);
          });
      } catch (error) {
        console.log('error getting follow user', error);
      }
    } else {
      try {
        await axios
          .post(
            `http://10.0.2.2:8080/users/unFollow/${userId}/${targentUserId}`,
          )
          .then(response => {
            if (response.data) {
              const updatedFollowings = response.data.followings;
              // setIsFollow(updatedFollowings);
              setAllUser(updatedFollowings);
              setFollowingCount(response.data.followings.length);
              setIsClicked(!isClicked);
              // console.log(updatedFollowings);
            }
          })
          .catch(error => {
            console.log('error handling follow', error);
          });
      } catch (error) {
        console.log('error getting follow user', error);
      }
    }
  };
  useEffect(() => {
    handleFollow();
  }, []);

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
        <Pressable
          style={[
            styles.followContainer,
            {borderColor: isClicked ? '#7ab317' : 'grey'},
          ]}
          onPress={() => {
            handleFollow(item._id);
          }}>
          <Text
            style={{
              fontSize: moderateScale(16),
              color: isClicked ? '#7ab317' : colors.text,
            }}>
            {allUser.includes(item._id) ? 'following' : 'follow'}
          </Text>
        </Pressable>
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
