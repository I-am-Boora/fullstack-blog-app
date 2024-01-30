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
import {getFormatedDate} from '../src/utils/utilityFunction';
import {userContext} from '../src/utils/UserContextProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const {colors} = useTheme();
  const route = useRoute();
  const {Post_Id} = route.params;
  const {height} = Dimensions.get('window');

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
      setAuthor(userId);
      const response = await axios.get(
        `http://10.0.2.2:8080/users/posts/${Post_Id}`,
      );
      setPostDetail(response.data);
      // console.log(response.data.comments);
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
  }, [Post_Id, postDetail]);

  useEffect(() => {
    fetchPostDetail();
  }, [commentCount, likeCount]);

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
        console.log(response.data);
        setIsPostLike(!isPostLike);
        setLikeCount(prev => prev + 1);
      })
      .catch(function (error) {
        console.log(error);
      });
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
                <Icon name="bookmark" size={24} color={'#0091ea'} />
              ) : (
                <Icon name="bookmark-outline" size={24} />
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
              {isPostLike ? (
                <Icon
                  name="heart"
                  size={22}
                  color={'red'}
                  onPress={handlePostUnlike}
                />
              ) : (
                <Icon
                  name="heart-outline"
                  size={22}
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
                    // width: '70%',
                    paddingHorizontal: scale(10),

                    height: 40,
                  },
                ]}
                // value={content}
                // onChangeText={text => {
                //   setContent(text);
                // }}
              />
              <Icon name="send-outline" size={24} onPress={handleComment} />
            </View>
          </View>

          {postDetail.comments &&
            postDetail.comments.map(item => {
              return (
                <View
                  key={item._id}
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
                      <Text style={{fontSize: 15, fontWeight: '500'}}>
                        sonu boora
                      </Text>
                      <Text style={{fontSize: 12}}> 12 Jan 2024</Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      lineHeight: 20,
                      paddingHorizontal: scale(5),
                      color: colors.text,
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

                  <View style={styles.replyCommentSection}>
                    {isCommentLike ? (
                      <Icon
                        name="heart"
                        size={24}
                        color={'red'}
                        onPress={() => {
                          setIsCommentLike(!isCommentLike);
                        }}
                      />
                    ) : (
                      <Icon
                        name="heart-outline"
                        size={24}
                        color={'red'}
                        onPress={() => {
                          setIsCommentLike(!isCommentLike);
                        }}
                      />
                    )}

                    <Icon name="chatbubble-ellipses-outline" size={24} />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '500',
                        color: '#00b4fc',
                      }}>
                      Reply 0
                    </Text>
                  </View>
                </View>
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
  commentUserImage: {
    width: scale(30),
    height: verticalScale(30),
    borderRadius: moderateScale(30),
    resizeMode: 'cover',
  },
  replyCommentSection: {
    flexDirection: 'row',
    marginLeft: scale(10),
    columnGap: 10,
    marginBottom: verticalScale(5),
  },
});
