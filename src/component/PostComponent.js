import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';

const PostComponent = ({item, navigation}) => {
  const {colors} = useTheme();
  // const onPressHandle = title => {
  // };
  const sendPostDetail = async Post_Id => {
    navigation.navigate('PostDetail', {Post_Id});
  };

  return (
    <Pressable
      onPress={() => sendPostDetail(item._id)}
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
            uri: item?.photo
              ? item.photo
              : 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800',
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
    </Pressable>
  );
};

export default PostComponent;

const styles = StyleSheet.create({
  postContainer: {
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
