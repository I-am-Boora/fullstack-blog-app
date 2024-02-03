import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';

const PostComponent = ({item, navigation, calculateTimeAgo}) => {
  const {colors} = useTheme();
  // const onPressHandle = title => {
  // };
  const sendPostDetail = async (Post_Id, userInfo) => {
    navigation.navigate('PostDetail', {Post_Id, userInfo});
  };

  return (
    <Pressable
      onPress={() => sendPostDetail(item._id, item.author)}
      style={[
        styles.postContainer,
        {
          // borderColor: colors.borderColor,
          backgroundColor: colors.secondaryBackground,
        },
      ]}>
      <View style={styles.leftContainer}>
        {item?.photo ? (
          <Image
            source={{
              uri: item?.photo,
            }}
            style={[
              styles.image,
              {
                height:
                  item.title.length > 35
                    ? verticalScale(90)
                    : verticalScale(70),
              },
            ]}
          />
        ) : (
          <View
            style={{
              width: scale(70),
              height:
                item.title.length > 35 ? verticalScale(90) : verticalScale(70),
              // borderWidth: 0.7,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.imageIconColor,
              // borderColor: 'black',
            }}>
            {console.log(item.title.length)}
            <Text
              style={{
                fontSize: moderateScale(40),
                color: colors.imageIconText,
              }}>
              I
            </Text>
          </View>
        )}
      </View>
      <View style={styles.rightContainer}>
        <View
          style={{
            backgroundColor: colors.imageIconColor,
            width: `${item.category.length * 3.2}%`,
            paddingHorizontal: 3,
            alignItems: 'center',
            paddingVertical: verticalScale(2),
            paddingHorizontal: scale(2),

            borderRadius: 20,
          }}>
          <Text style={[styles.authorTitle]}>{item.category}</Text>
        </View>

        <Text
          style={[styles.postTitle, {color: colors.text}]}
          numberOfLines={2}>
          {item.title.length > 62
            ? `${item.title.slice(0, 62)}...`
            : item.title}
        </Text>
        <View style={styles.authorSection}>
          {item?.author?.avatar ? (
            <Image
              source={{
                uri: item?.author?.avatar,
              }}
              style={{
                width: scale(20),
                height: verticalScale(20),
                borderRadius: moderateScale(20),
                resizeMode: 'cover',
              }}
            />
          ) : (
            <Image
              source={require('../assets/images/blank-profile.png')}
              style={{
                width: scale(16),
                height: verticalScale(16),
                borderRadius: moderateScale(16),
                resizeMode: 'cover',
                marginRight: scale(6),
              }}
            />
          )}

          <Text
            style={[
              styles.authorTitle,
              {fontFamily: 'Poppins-Medium', fontSize: moderateScale(13)},
            ]}>
            {item?.author?.fullName} ・{' '}
          </Text>
          <Text style={styles.authorTitle}>
            {calculateTimeAgo(item?.createdAt)}
          </Text>
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
    paddingBottom: 3,
  },
  leftContainer: {
    paddingTop: verticalScale(5),
    paddingLeft: scale(5),
  },

  image: {
    width: scale(70),

    resizeMode: 'cover',
    borderRadius: moderateScale(8),
  },
  rightContainer: {
    paddingHorizontal: scale(10),
    paddingTop: verticalScale(5),
    rowGap: 8,
    flex: 1,
  },
  postTitle: {
    fontSize: moderateScale(17),
    paddingRight: scale(23),
  },
  authorSection: {
    flexDirection: 'row',
    // paddingBottom: verticalScale(3),
    // paddingTop: 9,
    // marginVertical: verticalScale(3),
    alignItems: 'center',
  },
  authorTitle: {
    // paddingLeft: scale(3),
    fontSize: moderateScale(12),
  },
});
