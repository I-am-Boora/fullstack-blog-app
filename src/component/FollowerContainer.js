import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';

const FollowerContainer = ({item}) => {
  console.log(item?.fullName, item?.username);
  const {colors} = useTheme();
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
        <Pressable style={styles.followContainer}>
          <Text style={{fontSize: moderateScale(16), color: colors.text}}>
            follow
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
    borderColor: 'grey',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(3),
  },
});
