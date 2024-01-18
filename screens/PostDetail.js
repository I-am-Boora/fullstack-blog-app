import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';

const PostDetail = () => {
  const {colors} = useTheme();
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: scale(20),
        rowGap: 10,
        marginBottom: verticalScale(20),
      }}>
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
              style={{fontWeight: 'bold', fontSize: 16, color: colors.text}}>
              sonu boora
            </Text>
            <Text style={{fontSize: 13}}>18 Jan 2024</Text>
          </View>
          <Text style={{fontSize: 16, color: 'green'}}>follow</Text>
        </View>
        <View>
          <Icon name="bookmark-outline" size={24} />
        </View>
      </View>

      <Text style={[styles.blogTitle, {color: colors.text}]}>
        How to make react native more optimize.
      </Text>
      <Image
        source={{
          uri: 'https://images.pexels.com/photos/4126712/pexels-photo-4126712.jpeg?auto=compress&cs=tinysrgb&w=800',
        }}
        style={styles.blogImage}
      />
      <Text style={styles.blogDetail}>
        As soon as we identified the issue on November 4th, the community found
        and shared a manual workaround to fix the issue which would pin React
        Native to a specific, correcting the mistake. Then, over the weekend of
        November 5th and 6th, the release crew shipped patch releases for all
        previous React Native versions down to 0.63 which automatically applied
        the patch, so that users could update to a fixed version of React
        Native. At the same time, we reached out to Sonatype to ask for the
        removal of the offending artifacts. The issue was fully resolved on
        November 8th when the artifacts were fully removed from Maven Central.
      </Text>
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
          backgroundColor: 'black',
          borderRadius: moderateScale(10),
        }}
      />
      <TextInput placeholder="write comment" style={styles.inputBox} />
      <Pressable style={styles.commentBtn}>
        <Text style={{fontSize: moderateScale(20)}}>OK</Text>
      </Pressable>
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
