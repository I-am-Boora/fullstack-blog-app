import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';

const PostComponent = ({item}) => {
  const {colors} = useTheme();
  console.log(item.category);
  return (
    <View
      style={[
        styles.postContainer,
        {
          // borderColor: colors.borderColor,
          backgroundColor: colors.secondaryBackground,
        },
      ]}>
      <View style={styles.leftContainer}>
        <Image
          source={{
            uri: item.photo,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.authorTitle}>{item.category}</Text>
        <Text
          style={[styles.postTitle, {color: colors.text}]}
          numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.authorSection}>
          <Text style={styles.authorTitle}>sonu boora ・ </Text>
          <Text style={styles.authorTitle}>{item.updatedAt}</Text>
        </View>
      </View>
    </View>
  );
};

export default PostComponent;

const styles = StyleSheet.create({
  postContainer: {
    // borderWidth: moderateScale(0.7),
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
  authorTitle: {
    fontFamily: 'Poppins-Regular',
  },
});
