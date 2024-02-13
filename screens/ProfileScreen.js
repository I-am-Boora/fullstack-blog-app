import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useNavigation, useTheme} from '@react-navigation/native';
import {userContext} from '../src/utils/UserContextProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import ProfilePost from '../src/component/ProfilePost';
import {calculateTimeAgo} from '../src/utils/utilityFunction';

const ProfileScreen = ({navigation}) => {
  const [userInfo, setUserInfo] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const {colors} = useTheme();
  const {loginInfo} = useContext(userContext);
  // const navigation = useNavigation();
  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userId');
    navigation.navigate('Login');
  };
  useEffect(() => {
    if (!loginInfo) {
      navigation.navigate('Login');
    }
  }, []);

  const handleProfileImage = async () => {
    await launchImageLibrary({noData: true}, response => {
      // console.log(response);
      if (response.didCancel) {
        console.log('cancel the image picker');
      }
      if (response.errorMessage) {
        console.log('error during image picking', errorMessage);
      }
      if (response && response.assets) {
        setAvatar(response);
      }
    });
    const formData = new FormData();
    const userId = await AsyncStorage.getItem('userId');

    if (avatar && avatar.assets) {
      formData.append('avatar', {
        uri: avatar.assets[0].uri,
        type: avatar.assets[0].type,
        name: avatar.assets[0].fileName,
      });

      try {
        await axios
          .post(
            `http://10.0.2.2:8080/users/updateProfilePhoto/${userId}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          )
          .then(response => {
            console.log('Image uploaded successfully', response.data);
            setProfilePhoto(response.data);
          });
      } catch (error) {
        console.error('Error uploading image', error.response.data);
        // setShowBanner(false);
      }
    }
  };

  return loginInfo ? (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <Pressable
        onPress={handleLogout}
        style={{
          backgroundColor: colors.secondaryBackground,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: moderateScale(10),
          borderRadius: moderateScale(15),
          marginTop: verticalScale(10),
          elevation: 4,
        }}>
        <Text style={[styles.profileName, {color: colors.text}]}>Logout</Text>
      </Pressable>
      <View
        style={[
          styles.profileContainer,
          {backgroundColor: colors.secondaryBackground},
        ]}>
        <View style={styles.leftContainer}>
          <Pressable style={styles.imageContainer} onPress={handleProfileImage}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              style={styles.image}
            />
          </Pressable>
          <Text
            style={[
              styles.profileName,
              {
                color: colors.text,
                fontSize: moderateScale(18),
                textTransform: 'capitalize',
                marginTop: verticalScale(10),
              },
            ]}>
            {loginInfo?.user?.fullName}
          </Text>
          <View style={{flexDirection: 'row', paddingBottom: verticalScale(3)}}>
            <Text style={{fontSize: moderateScale(14)}}>
              {loginInfo?.user?.username} |{' '}
            </Text>
            <Text style={{fontSize: moderateScale(14)}}>
              {loginInfo?.user?.email}
            </Text>
          </View>

          <Text style={{marginBottom: verticalScale(20)}}>
            joined {calculateTimeAgo(loginInfo?.user?.createdAt)}
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.followerandpost}>
            <Pressable
              style={styles.followerContainer}
              onPress={() => {
                navigation.navigate('Follower', {title: 'Followers'});
              }}>
              <Text style={[styles.countTitle, {color: colors.text}]}>
                {loginInfo?.user?.followers?.length}
              </Text>
              <Text style={styles.follower}>followers</Text>
            </Pressable>
            <Pressable
              style={styles.postContainer}
              onPress={() => {
                navigation.navigate('Follower', {title: 'Followings'});
              }}>
              <Text style={[styles.countTitle, {color: colors.text}]}>
                {loginInfo?.user?.followings?.length}
              </Text>
              <Text style={styles.post}>followings</Text>
            </Pressable>
            <View style={styles.postContainer}>
              <Text style={[styles.countTitle, {color: colors.text}]}>
                {loginInfo?.user?.posts?.length}
              </Text>
              <Text style={styles.post}>posts</Text>
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
        {loginInfo?.user?.posts ? (
          loginInfo?.user?.posts.map((item, index) => (
            <ProfilePost item={item} key={index.toString()} />
          ))
        ) : (
          <Text style={styles.profileName}>No posts</Text>
        )}
      </View>
    </ScrollView>
  ) : (
    <ActivityIndicator />
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: scale(10),
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    padding: moderateScale(10),
    marginTop: verticalScale(10),
    borderRadius: moderateScale(15),
  },
  leftContainer: {alignItems: 'center'},
  rightContainer: {width: '75%', marginTop: verticalScale(10)},
  image: {
    width: scale(100),
    height: verticalScale(100),
    borderRadius: moderateScale(100),
    resizeMode: 'cover',
  },
  profileName: {
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-Medium',
  },
  followerandpost: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  followerContainer: {justifyContent: 'center', alignItems: 'center'},
  postContainer: {justifyContent: 'center', alignItems: 'center'},
  follower: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  post: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  postSection: {},
  allpost: {
    borderRadius: moderateScale(15),
    marginTop: verticalScale(10),
    height: 50,
    padding: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    elevation: 1,
  },
  countTitle: {
    fontSize: moderateScale(20),
    fontFamily: 'Poppins-Medium',
  },
});
