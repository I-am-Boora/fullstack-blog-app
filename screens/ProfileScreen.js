import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';

const ProfileScreen = () => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
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
            Scarlet Jones
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
                Likes
              </Text>
              <Text style={styles.post}>1M</Text>
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
        style={[styles.allpost, {backgroundColor: colors.secondaryBackground}]}>
        <Text style={[styles.profileName, {color: colors.text}]}>
          All posts
        </Text>
      </View>
      <View style={styles.postSection}>
        <Text style={styles.profileName}>No posts</Text>
      </View>
    </View>
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

    padding: moderateScale(10),
    marginTop: verticalScale(25),
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
    fontSize: moderateScale(16),
    fontFamily: 'Poppins-Medium',
    paddingVertical: verticalScale(5),
  },
  followerandpost: {
    // width: '80%',
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
    // marginVertical: verticalScale(10),
    marginTop: verticalScale(10),
    height: 50,
    padding: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
