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
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import {useRoute, useTheme} from '@react-navigation/native';
import axios from 'axios';
import {calculateTimeAgo, getFormatedDate} from '../src/utils/utilityFunction';
import {userContext} from '../src/utils/UserContextProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommentSection from '../src/component/CommentSection';

const PostDetail = () => {
  const [saved, setSaved] = useState(false);
  const [postDetail, setPostDetail] = useState(null);
  const [formatDate, setFormatDate] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentTime, setCommentTime] = useState(null);
  const [commentContent, setCommentContent] = useState('');
  const [isClickOnReadMore, setIsClickOnReadMore] = useState(false);
  const [isCommentLike, setIsCommentLike] = useState(false);
  const [isPostLike, setIsPostLike] = useState(false);
  const [author, setAuthor] = useState(null);
  const [commentCount, setCommentCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [likeIndex, setLikeIndex] = useState(null);
  const [showActivity, setShowActivity] = useState(false);
  const [isSaved, setIsSaved] = useState(null);
  const {colors} = useTheme();
  const route = useRoute();
  const {Post_Id, userInfo} = route.params;
  const {height} = Dimensions.get('window');
  const {postSaved, setPostSaved} = useContext(userContext);
  const handleComment = async () => {
    if (!author) {
      const userId = await AsyncStorage.getItem('userId');
      setAuthor(userId);
    }
    await axios
      .post(`http://10.0.2.2:8080/users/createComments`, {
        author,
        commentContent,
        Post_Id,
      })
      .then(function (response) {
        console.log(response.data);
        setComments(response.data.newComment);
        setCommentCount(prev => prev + 1);
        // console.log(response.data);
        if (response.data.newComment) {
          const data = getFormatedDate(response.data.newComment.createdAt);
          setCommentTime(data);
          // console.log(comments);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchPostDetail = useCallback(async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        setAuthor(userId);
      }

      const response = await axios.get(
        `http://10.0.2.2:8080/users/posts/${Post_Id}`,
      );
      setPostDetail(response.data);
      // console.log(response.data.comments[0].author.username);
      setCommentCount(response.data.comments.length);
      setLikeCount(response.data.likes.length);
      if (response.data) {
        const data = getFormatedDate(response.data.createdAt);
        setFormatDate(data);
      }
      // console.log(response.data);
      // setLoading(false);
    } catch (error) {
      console.error('Error fetching comments:', error);
      // setLoading(false);
    }
  }, [Post_Id, postDetail, postSaved]);

  useEffect(() => {
    fetchPostDetail();
  }, [commentCount, likeCount, saved, showActivity]);

  const handlePostUnlike = async () => {
    await axios
      .post(`http://10.0.2.2:8080/users/postUnlike/${Post_Id}/${author}`)
      .then(response => {
        console.log(response.data);
        setIsPostLike(!isPostLike);
        setLikeCount(prev => prev - 1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handlePostLike = async () => {
    await axios
      .post(`http://10.0.2.2:8080/users/postLike/${Post_Id}/${author}`)
      .then(response => {
        console.log(response.data.isSave);
        setIsPostLike(!isPostLike);
        setLikeCount(prev => prev + 1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSavePost = async () => {
    setShowActivity(true);
    try {
      await axios
        .put(`http://10.0.2.2:8080/users/savePost/${Post_Id}/${author}`)
        .then(response => {
          if (response.data) {
            setPostSaved(response.data.isSave);
            setShowActivity(false);
          }
        })
        .catch(error => console.log('error during un-save post', error));
    } catch (error) {
      console.log('error handing un-save post', error);
    }
  };

  const handleUnsavePost = async () => {
    setShowActivity(true);
    try {
      const response = await axios.put(
        `http://10.0.2.2:8080/users/unSavePost/${Post_Id}/${author}`,
      );
      if (response.data) {
        setPostSaved(response.data.isSave);
        setShowActivity(false);
      }
    } catch (error) {
      console.log('Error during post un-saved', error);
    } finally {
      setShowActivity(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: scale(10),
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
              {userInfo?.avatar ? (
                <Image
                  source={{
                    uri: userInfo?.avatar,
                  }}
                  style={styles.image}
                />
              ) : (
                <Image
                  source={require('../src/assets/images/blank-profile.png')}
                  style={styles.image}
                />
              )}

              <View style={styles.userDetail}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: colors.text,
                  }}>
                  {userInfo ? userInfo?.fullName : 'unknown'}
                </Text>
                <View style={{flexDirection: 'row', columnGap: 5}}>
                  <Text style={{fontSize: 13}}>
                    {calculateTimeAgo(postDetail.createdAt)}
                  </Text>
                </View>
              </View>
              <Text style={{fontSize: 16, color: 'green'}}>follow</Text>
            </View>
            <Pressable>
              {showActivity ? (
                <ActivityIndicator color={'#0091ea'} />
              ) : postDetail.isSave ? (
                <Icon
                  name="bookmark"
                  size={24}
                  color={'#0091ea'}
                  onPress={handleUnsavePost}
                />
              ) : (
                <Icon
                  name="bookmark-outline"
                  size={24}
                  onPress={handleSavePost}
                />
              )}
            </Pressable>
          </View>

          <Text style={[styles.blogTitle, {color: colors.text}]}>
            {postDetail.title}
          </Text>
          {postDetail.photo && (
            <Image
              source={{
                uri: postDetail.photo,
              }}
              style={styles.blogImage}
            />
          )}

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
                  color: colors.text,
                }}>
                Comments
              </Text>
              <Text
                style={{
                  fontSize: moderateScale(16),
                  fontWeight: '500',
                }}>
                {postDetail.comments.length}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 5,
                marginRight: scale(10),
              }}>
              <View
                style={{
                  // backgroundColor: 'blue',
                  width: 55,
                  height: 30,
                }}>
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: '#ffc6a5',
                    width: 30,
                    height: 30,
                    borderRadius: 30,
                    zIndex: 10,
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: '#b3e099',
                    width: 30,
                    left: 15,
                    height: 30,
                    borderRadius: 30,
                    zIndex: -1,
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: '#a8a39d',
                    width: 30,
                    left: 25,
                    height: 30,
                    borderRadius: 30,
                    zIndex: -10,
                  }}
                />
              </View>
              {postDetail.isLike ? (
                <Icon
                  name="heart"
                  size={24}
                  color={'red'}
                  onPress={handlePostUnlike}
                />
              ) : (
                <Icon
                  name="heart-outline"
                  size={24}
                  color={'red'}
                  onPress={handlePostLike}
                />
              )}

              <Text
                style={{
                  fontSize: moderateScale(16),
                  fontWeight: '500',
                }}>
                {postDetail.likes.length}
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
                value={commentContent}
                onChangeText={text => setCommentContent(text)}
                style={[
                  styles.inputBox,
                  {
                    borderColor: colors.borderColor,
                    flex: 1,
                    paddingHorizontal: scale(10),

                    height: 40,
                  },
                ]}
              />
              <Icon name="send" size={24} onPress={handleComment} />
            </View>
          </View>

          {postDetail.comments &&
            postDetail.comments.map((item, index) => {
              return (
                <CommentSection item={item} key={item._id} index={index} />
              );
            })}
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

  commentUserImage: {
    width: scale(30),
    height: verticalScale(30),
    borderRadius: moderateScale(30),
    resizeMode: 'cover',
  },
});
