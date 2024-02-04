import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useCallback, useContext, useState} from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import {userContext} from '../utils/UserContextProvider';
import {calculateTimeAgo} from '../utils/utilityFunction';
import Modal from 'react-native-modal';
import axios from 'axios';
const ProfilePost = ({item}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {colors} = useTheme();
  const {loginInfo, setDeletePost} = useContext(userContext);
  const deletePost = async () => {
    setIsModalVisible(false);
    await axios
      .put(
        `http://10.0.2.2:8080/users/deletePost/${item._id}/${loginInfo.user._id}`,
      )
      .then(response => {
        if (response.data) {
          console.log(response.data);
          setDeletePost(loginInfo.user.posts.length - 1);
        }
      })
      .catch(error => {
        console.log('error deleting post', error);
      });
  };
  return (
    <View
      style={[styles.container, {backgroundColor: colors.secondaryBackground}]}>
      <View style={styles.headerSection}>
        <View style={styles.headerLeftSection}>
          {loginInfo?.user?.avatar ? (
            <Image
              source={{uri: loginInfo?.user?.avatar}}
              style={{
                width: scale(35),
                height: verticalScale(35),
                borderRadius: moderateScale(35),
                resizeMode: 'cover',
              }}
            />
          ) : (
            <Image
              source={require('../assets/images/blank-profile.png')}
              style={{
                width: scale(35),
                height: verticalScale(35),
                borderRadius: moderateScale(35),
                resizeMode: 'cover',
              }}
            />
          )}

          <View style={styles.userInfo}>
            <Text style={[styles.userTitle, {color: colors.text}]}>
              {loginInfo?.user?.username}
            </Text>
            <Text style={styles.postTime}>
              {calculateTimeAgo(item?.createdAt)}
            </Text>
          </View>
        </View>
        <View>
          <Icon
            name="ellipsis-horizontal"
            size={24}
            onPress={() => {
              setIsModalVisible(true);
            }}
          />
        </View>
      </View>
      <View style={styles.contentSection}>
        <Text style={[styles.contentTitle, {color: colors.text}]}>
          {item?.title}
        </Text>
        <Text style={styles.mainContent}>
          {item?.content?.length > 120
            ? item?.content?.slice(0, 120)
            : item?.content}
          {item?.content?.length > 100 && (
            <Text onPress={() => {}} style={{fontWeight: '500'}}>
              ...readMore
            </Text>
          )}
        </Text>
      </View>
      <View style={styles.imageSection}>
        {item?.photo && (
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/18099926/pexels-photo-18099926/free-photo-of-woman-in-tied-crop-top-crouching-on-white-spot.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            }}
            style={styles.postImage}
          />
        )}
      </View>
      <View style={styles.likeAndCommentSection}>
        <View style={styles.commentSection}>
          <Icon name="chatbubble-ellipses-outline" size={24} />
          <Text style={styles.number}>{item?.comments?.length}</Text>
        </View>
        <View style={styles.likeSection}>
          <Icon name="heart-outline" size={24} color={'red'} />
          <Text style={styles.number}>{item?.likes?.length}</Text>
        </View>
        <Text
          style={{
            backgroundColor: colors.imageIconColor,
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: 20,
            position: 'absolute',
            right: 0,
          }}>
          {item?.category}
        </Text>
      </View>
      <View>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setIsModalVisible(false)}
          onBackButtonPress={() => {
            setIsModalVisible(false);
          }}
          animationOutTiming={600}
          animationIn={'zoomIn'}
          animationOut={'zoomOut'}>
          <View
            style={{
              backgroundColor: colors.background,
              height: verticalScale(100),
              borderRadius: moderateScale(15),
            }}>
            <View
              style={{
                alignItems: 'flex-end',
                paddingRight: scale(20),
                marginTop: verticalScale(10),
              }}>
              <Icon
                name="close-outline"
                size={24}
                onPress={() => {
                  setIsModalVisible(false);
                }}
              />
            </View>

            <Pressable
              onPress={deletePost}
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: moderateScale(18), paddingRight: 10}}>
                Delete Post
              </Text>
              <Icon name="trash-outline" size={20} color={'red'} />
            </Pressable>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default ProfilePost;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(20),
    marginTop: verticalScale(10),
    paddingVertical: 10,
    borderRadius: moderateScale(15),
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeftSection: {flexDirection: 'row', alignItems: 'center'},
  userInfo: {
    paddingLeft: scale(10),
  },
  userTitle: {
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  postTime: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(11),
  },
  contentTitle: {
    fontSize: moderateScale(18),
    marginTop: verticalScale(5),
  },
  contentSection: {flex: 1},
  mainContent: {
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-Regular',
    paddingVertical: verticalScale(3),
    textAlign: 'auto',
  },
  postImage: {
    width: '100%',
    height: verticalScale(200),
    resizeMode: 'cover',
    borderRadius: moderateScale(10),
  },
  likeAndCommentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
    columnGap: 20,
  },
  commentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  likeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  number: {
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-Regular',
  },
});
