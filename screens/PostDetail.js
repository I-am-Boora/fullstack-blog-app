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
          <Text
            style={{
              fontSize: moderateScale(16),
              fontWeight: 'bold',
            }}>
            Comments
          </Text>
          <View
            style={{
              width: scale(80),
              height: 4,
              backgroundColor: colors.secondaryBackground,
              borderRadius: moderateScale(10),
            }}
          />
          <TextInput
            placeholder="write comment"
            style={[styles.inputBox, {borderColor: colors.borderColor}]}
          />
          <Pressable style={styles.commentBtn}>
            <Text style={{fontSize: moderateScale(20)}}>OK</Text>
          </Pressable>
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
    width: scale(30),
    height: verticalScale(30),
    borderRadius: moderateScale(30),
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
  commentBtn: {
    width: '100%',
    height: verticalScale(44),
    backgroundColor: '#8c9eff',
    borderRadius: moderateScale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
