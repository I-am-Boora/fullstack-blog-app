import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import {useRoute, useTheme} from '@react-navigation/native';
import axios from 'axios';
import {getFormatedDate} from '../src/utils/utilityFunction';

const PostDetail = () => {
  const [saved, setSaved] = useState(false);
  const [postDetail, setPostDetail] = useState(null);
  const [formatDate, setFormatDate] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentTime, setCommentTime] = useState(null);
  const [content, setContent] = useState('');
  const {colors} = useTheme();
  const route = useRoute();
  const {Post_Id} = route.params;
  const {height} = Dimensions.get('window');
  useEffect(() => {
    const getPostDetail = async () => {
      await axios
        .post('http://10.0.2.2:8080/users/searchPost', {Post_Id})
        .then(function (response) {
          setPostDetail(response.data.post);
          if (response.data.post) {
            const data = getFormatedDate(response.data.post.createdAt);
            setFormatDate(data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getPostDetail();
  }, []);
  console.log(comments);
  const handleComment = async () => {
    await axios
      .post('http://10.0.2.2:8080/users/comment', {content, Post_Id})
      .then(function (response) {
        setComments(response.data.newComment);
        console.log(response.data);
        if (response.data.newComment) {
          const data = getFormatedDate(response.data.newComment.createdAt);
          setCommentTime(data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: scale(20),
        rowGap: 10,
        marginBottom: verticalScale(20),
      }}>
      {postDetail && formatDate ? (
        <>
          <View style={styles.headerContainer}>
            <View
              style={{
                flexDirection: 'row',
                columnGap: 10,
                alignItems: 'center',
              }}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                }}
                style={styles.image}
              />
              <View style={styles.userDetail}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: colors.text,
                  }}>
                  sonu boora
                </Text>
                <View style={{flexDirection: 'row', columnGap: 5}}>
                  <Text style={{fontSize: 13}}>{formatDate.date}</Text>
                  <Text style={{fontSize: 13}}>{formatDate.month}</Text>
                  <Text style={{fontSize: 13}}>{formatDate.year}</Text>
                </View>
              </View>
              <Text style={{fontSize: 16, color: 'green'}}>follow</Text>
            </View>
            <Pressable onPress={() => setSaved(!saved)}>
              {saved ? (
                <Icon name="bookmark" size={24} color={colors.secondary} />
              ) : (
                <Icon name="bookmark-outline" size={24} />
              )}
            </Pressable>
          </View>

          <Text style={[styles.blogTitle, {color: colors.text}]}>
            {postDetail.title}
          </Text>
          <Image
            source={{
              uri: postDetail.photo,
            }}
            style={styles.blogImage}
          />
          <Text style={styles.blogDetail}>{postDetail.content}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={styles.commentTitleContainer}>
              <Icon name="filter-outline" size={24} />
              <Text
                style={{
                  fontSize: moderateScale(16),
                  fontWeight: 'bold',
                }}>
                Comments
              </Text>
              <Text
                style={{
                  fontSize: moderateScale(14),
                  fontWeight: '500',
                }}>
                0
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 10,
              }}>
              <Icon name="heart-outline" size={22} />
              <Text
                style={{
                  fontSize: moderateScale(14),
                  fontWeight: '500',
                }}>
                0
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.commentContainer,
              {backgroundColor: colors.secondaryBackground},
            ]}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                columnGap: 10,
              }}>
              <View>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  }}
                  style={styles.image}
                />
              </View>
              <TextInput
                placeholder="write comment"
                style={[
                  styles.inputBox,
                  {
                    borderColor: colors.borderColor,
                    flex: 1,
                    // width: '70%',
                    paddingHorizontal: scale(10),

                    height: 40,
                  },
                ]}
                value={content}
                onChangeText={text => {
                  setContent(text);
                }}
              />
              <Icon name="send-outline" size={24} />
            </View>
          </View>
          <View
            style={[
              styles.commentDetailContainer,
              {backgroundColor: colors.secondaryBackground},
            ]}>
            <View style={styles.userInfo}>
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  }}
                  style={styles.commentUserImage}
                />
              </View>
              <View style={styles.userProfileContainer}>
                <Text
                  style={{fontSize: 15, color: colors.text, fontWeight: '500'}}>
                  sonu boora
                </Text>
                <Text style={{fontSize: 12}}> 12 Jan 2024</Text>
              </View>
            </View>
            <Text style={{fontSize: 14, lineHeight: 20}}>
              This post is very helpful for me thankyou very much "My heart
              skipped a beat when I saw this. ❤️" "Embracing the beauty captured
              in this moment. 💖"
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: colors.secondary,
              }}>
              Reply 0
            </Text>
          </View>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: height / 2 - 20,
          }}>
          <ActivityIndicator size={40} color={colors.primary} />
        </View>
      )}
    </ScrollView>
  );
};
export default PostDetail;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(30),
  },
  image: {
    width: scale(40),
    height: verticalScale(40),
    borderRadius: moderateScale(40),
    resizeMode: 'cover',
  },
  blogTitle: {
    fontSize: moderateScale(25),
    fontFamily: 'Roboto-Medium',
  },
  blogImage: {
    width: '100%',
    height: verticalScale(230),
    borderRadius: moderateScale(15),
    resizeMode: 'cover',
  },
  blogDetail: {
    fontSize: moderateScale(16),
    fontFamily: 'Poppins-Regular',
    lineHeight: 30,
  },
  inputBox: {
    borderBottomWidth: 1,
  },

  commentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: scale(8),
    height: verticalScale(60),
    borderRadius: moderateScale(15),
  },
  commentTitleContainer: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
  },
  commentDetailContainer: {
    rowGap: 5,
    borderRadius: moderateScale(15),
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  commentUserImage: {
    width: scale(30),
    height: verticalScale(30),
    borderRadius: moderateScale(30),
    resizeMode: 'cover',
  },
});
