import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';

import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {TextInput} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {calculateTimeAgo} from '../utils/utilityFunction';
const CommentSection = ({item, index}) => {
  const [isClickOnReadMore, setIsClickOnReadMore] = useState(false);
  const [isCommentLike, setIsCommentLike] = useState(false);
  const [isReplyVisible, setIsReplyVisible] = useState(false);
  const [openReplyIndex, setOpenReplyIndex] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {colors} = useTheme();
  const handleReplyInputBox = currentIndex => {
    setOpenReplyIndex(prevIndex => (prevIndex === index ? null : index));
  };
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;
  // console.log(item);
  return (
    <View
      key={item._id}
      style={[
        styles.commentDetailContainer,
        {backgroundColor: colors.secondaryBackground},
      ]}>
      <View style={styles.userInfo}>
        <View style={styles.imageContainer}>
          {item?.author?.avatar ? (
            <Image
              source={{
                uri: item?.author?.avatar,
              }}
              style={styles.commentUserImage}
            />
          ) : (
            <Image
              source={require('../assets/images/blank-profile.png')}
              style={styles.commentUserImage}
            />
          )}
        </View>
        <View style={styles.userProfileContainer}>
          <View
            style={{
              // flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start',
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                // fontFamily: 'Poppins-Regular',
              }}>
              {item?.author?.username}・
            </Text>
            <Text style={{fontSize: 12}}>
              {calculateTimeAgo(item.createdAt)}
            </Text>
          </View>

          <View
            style={{
              alignSelf: 'flex-start',
            }}>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 20,
                paddingHorizontal: scale(5),
                color: colors.text,
                marginRight: 15,
                // width: '100%',
                // marginLeft: 45,
              }}>
              {isClickOnReadMore
                ? item?.commentContent?.commentContent
                : item?.commentContent.slice(0, 200)}
              {item?.comments?.length > 200 && (
                <Text
                  onPress={() => {
                    setIsClickOnReadMore(!isClickOnReadMore);
                  }}
                  style={{fontWeight: '500'}}>
                  {isClickOnReadMore ? ' Read less' : '...Read more'}
                </Text>
              )}
            </Text>
          </View>
          <View style={styles.replyCommentSection}>
            {isCommentLike ? (
              <Icon
                name="heart"
                size={20}
                color={'red'}
                onPress={() => {
                  setIsCommentLike(!isCommentLike);
                }}
              />
            ) : (
              <Icon
                name="heart-outline"
                size={20}
                color={'red'}
                onPress={() => {
                  setIsCommentLike(!isCommentLike);
                }}
              />
            )}

            <Icon
              name="chatbubble-ellipses-outline"
              size={20}
              onPress={() => handleReplyInputBox()}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                color: '#00b4fc',
              }}
              onPress={() => setIsModalVisible(true)}>
              Reply 0
            </Text>
          </View>
        </View>
      </View>

      {openReplyIndex == index && (
        <View behavior="padding" style={styles.replyContainer}>
          <TextInput placeholder="reply" />
          <Icon name="send" size={24} />
        </View>
      )}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setIsModalVisible(false)}
          deviceWidth={deviceWidth}
          deviceHeight={deviceHeight}
          style={{
            flex: 1,
            backgroundColor: 'white',
            width: deviceWidth,
            paddingHorizontal: 5,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            justifyContent: 'center',
            backgroundColor: colors.background,
            alignSelf: 'center',
            marginBottom: 0,
          }}>
          <View style={{flex: 1}}>
            <View
              style={{
                width: 70,
                height: 6,
                backgroundColor: 'grey',
                borderRadius: 10,
                marginTop: 15,
                alignSelf: 'center',
                marginBottom: 15,
              }}
            />
            <CommentSection item={item} index={index} />
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default CommentSection;

const styles = StyleSheet.create({
  commentDetailContainer: {
    rowGap: 5,
    borderRadius: moderateScale(15),
  },
  userInfo: {
    flexDirection: 'row',
    // alignItems: 'center',
    columnGap: 10,
    marginTop: verticalScale(5),
    marginLeft: scale(5),
  },
  userProfileContainer: {
    alignItems: 'center',
  },
  commentUserImage: {
    width: scale(25),
    height: verticalScale(25),
    borderRadius: moderateScale(25),
    resizeMode: 'cover',
  },
  imageContainer: {
    marginTop: 5,
  },
  replyCommentSection: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 5,
    // marginLeft: scale(10),
    columnGap: 10,
    marginBottom: verticalScale(5),
  },
  replyContainer: {
    borderWidth: 1,
    borderRadius: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
