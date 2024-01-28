import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useNavigation, useTheme} from '@react-navigation/native';
import {userContext} from '../src/utils/UserContextProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const {colors} = useTheme();
  const {loginInfo} = useContext(userContext);
  const navigation = useNavigation();
  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userId');
    navigation.navigate('Login');
  };
  console.log(loginInfo);
  return (
    loginInfo && (
      <View style={styles.container}>
        <Pressable
          onPress={handleLogout}
          style={{
            backgroundColor: colors.secondaryBackground,
            height: 40,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: moderateScale(15),
            marginTop: verticalScale(10),
          }}>
          <Text style={[styles.profileName, {color: colors.text}]}>Logout</Text>
        </Pressable>
        <View
          style={[
            styles.profileContainer,
            {backgroundColor: colors.secondaryBackground},
          ]}>
          <View style={styles.leftContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                }}
                style={styles.image}
              />
            </View>
            <Text
              style={[
                styles.profileName,
                {color: colors.text, fontSize: moderateScale(12)},
              ]}>
              {loginInfo?.user?.fullName}
            </Text>
          </View>
          <View style={styles.rightContainer}>
            <View style={styles.followerandpost}>
              <View style={styles.followerContainer}>
                <Text style={[styles.profileName, {color: colors.text}]}>
                  Followers
                </Text>
                <Text style={styles.follower}>131k</Text>
              </View>
              <View style={styles.postContainer}>
                <Text style={[styles.profileName, {color: colors.text}]}>
                  Followings
                </Text>
                <Text style={styles.post}>188</Text>
              </View>
              <View style={styles.postContainer}>
                <Text style={[styles.profileName, {color: colors.text}]}>
                  Posts
                </Text>
                <Text style={styles.post}>121</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.allpost,
            {backgroundColor: colors.secondaryBackground},
          ]}>
          <Text style={[styles.profileName, {color: colors.text}]}>
            All posts
          </Text>
        </View>
        <View style={styles.postSection}>
          <Text style={styles.profileName}>No posts</Text>
        </View>
      </View>
    )
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: scale(10),
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 4,
    padding: moderateScale(10),
    marginTop: verticalScale(10),
    borderRadius: moderateScale(15),
  },
  leftContainer: {alignItems: 'center', width: '30%'},
  rightContainer: {width: '70%'},
  image: {
    width: scale(60),
    height: verticalScale(60),
    borderRadius: moderateScale(60),
    resizeMode: 'cover',
  },
  profileName: {
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-Medium',
    paddingVertical: verticalScale(5),
  },
  followerandpost: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  followerContainer: {justifyContent: 'center', alignItems: 'center'},
  postContainer: {justifyContent: 'center', alignItems: 'center'},
  follower: {
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  post: {
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  postSection: {
    flex: 1,
    borderRadius: moderateScale(15),
    borderWidth: moderateScale(0.4),
    width: '100%',
    marginVertical: verticalScale(10),
    padding: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  allpost: {
    borderRadius: moderateScale(15),
    marginTop: verticalScale(10),
    height: 50,
    padding: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    elevation: 4,
  },
});
