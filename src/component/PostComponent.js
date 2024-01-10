import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';

const PostComponent = () => {
  const {colors} = useTheme();
  return (
    <View style={[styles.postContainer, {borderColor: colors.borderColor}]}>
      <View style={styles.leftContainer}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.rightContainer}>
        <Text>Programming</Text>
        <Text
          style={[styles.postTitle, {color: colors.text}]}
          numberOfLines={2}>
          How to make react native more optimize?
        </Text>
        <View style={styles.authorSection}>
          <Text>sonu boora ・ </Text>
          <Text>10 Jan 2024</Text>
        </View>
      </View>
    </View>
  );
};

export default PostComponent;

const styles = StyleSheet.create({
  postContainer: {
    borderWidth: moderateScale(0.7),
    borderRadius: moderateScale(15),
    flexDirection: 'row',
    marginVertical: verticalScale(3),
  },
  leftContainer: {
    paddingTop: verticalScale(5),
    paddingLeft: scale(5),
  },

  image: {
    width: scale(70),
    height: verticalScale(70),
    resizeMode: 'cover',
    borderRadius: moderateScale(8),
  },
  rightContainer: {
    paddingHorizontal: scale(10),
    paddingTop: verticalScale(5),
  },
  postTitle: {
    fontSize: moderateScale(17),
    paddingRight: scale(23),
  },
  authorSection: {
    flexDirection: 'row',
    paddingBottom: verticalScale(3),
  },
});
