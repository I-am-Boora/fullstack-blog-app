import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useEffect} from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';
import {gridData} from '../src/utils/data';
import InputBox from '../src/component/InputBox';
import Icon from 'react-native-vector-icons/Ionicons';
import PostComponent from '../src/component/PostComponent';

const HomeScreen = () => {
  const {colors} = useTheme();
  useEffectct(() => {}, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.title, {color: colors.text}]}>Discover</Text>
      <View
        style={[
          styles.imageContainer,
          {backgroundColor: colors.secondaryBackground},
        ]}>
        <ImageBackground
          resizeMode="contain"
          source={require('../src/assets/images/Thinking.png')}
          style={styles.image}>
          <View
            style={{
              justifyContent: 'center',
              marginTop: 30,
              padding: 10,
            }}>
            <Text
              style={{
                fontSize: moderateScale(30),
                fontWeight: 'bold',
                // fontFamily: 'Roboto-Bold',
                fontFamily: 'Poppins-Bold',
                color: colors.secondary,
              }}>
              Write
            </Text>
            <Text
              style={{
                fontSize: moderateScale(30),
                fontWeight: 'bold',
                fontFamily: 'Poppins-Bold',
                color: colors.secondary,
              }}>
              Blog
            </Text>
            <Text
              style={{
                fontSize: moderateScale(30),
                fontWeight: 'bold',
                fontFamily: 'Poppins-Bold',
                color: colors.secondary,
              }}>
              Here
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.secondaryBackground,
          },
        ]}>
        <TextInput placeholder="search here" style={styles.inputText} />
        <Icon name="search" size={24} />
      </View>
      <Text style={[styles.headingTitle, {color: colors.text}]}>
        Latest Blog
      </Text>
      <PostComponent />
      <PostComponent />
      <PostComponent />
      <PostComponent />
      <PostComponent />
      <PostComponent />
      <PostComponent />
      <PostComponent />
      <PostComponent />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(15),
  },
  title: {
    fontSize: moderateScale(35),
    fontFamily: 'Lora-VariableFont_wght',
    marginVertical: verticalScale(20),
  },
  categoryContainer: {
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(20),
  },
  categoryText: {
    fontSize: moderateScale(20),
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    columnGap: 10,
    borderRadius: moderateScale(15),
    marginVertical: verticalScale(10),
    elevation: 3,
  },
  inputText: {
    fontSize: moderateScale(15),
  },
  headingTitle: {
    fontSize: moderateScale(18),
    fontFamily: 'Poppins-Medium',
  },
  imageContainer: {
    borderRadius: moderateScale(15),
  },
  image: {
    width: '100%',
    height: 200,
  },
});
