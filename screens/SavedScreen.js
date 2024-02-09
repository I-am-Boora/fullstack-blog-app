import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React, {useContext, useEffect, useState, useTransition} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostSaveComponent from '../src/component/PostSaveComponent';
import {useNavigation, useTheme} from '@react-navigation/native';
import PostComponent from '../src/component/PostComponent';
import {calculateTimeAgo} from '../src/utils/utilityFunction';
import {userContext} from '../src/utils/UserContextProvider';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const SavedScreen = () => {
  const {loginInfo} = useContext(userContext);
  const navigation = useNavigation();
  const {colors} = useTheme();
  return (
    <ScrollView style={{flex: 1}}>
      <Text style={[styles.title, {color: colors.text}]}>Saved Posts</Text>
      <Text style={styles.subTitle}>
        Total saved {loginInfo?.user?.savedPost.length}
      </Text>
      {loginInfo?.user?.savedPost ? (
        loginInfo?.user?.savedPost.map((item, index) => {
          return (
            <PostComponent
              item={item}
              navigation={navigation}
              key={index}
              calculateTimeAgo={calculateTimeAgo}
            />
          );
        })
      ) : (
        <View
          style={{
            // flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'blue',
            width: 100,
            height: 100,
          }}>
          <Image
            source={require('../src/assets/images/empty-box.png')}
            style={styles.image}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: moderateScale(40),
    fontFamily: 'Lora-VariableFont_wght',
    marginVertical: verticalScale(5),
    paddingHorizontal: scale(10),
  },
  subTitle: {
    paddingHorizontal: scale(10),
    fontSize: moderateScale(16),
    fontFamily: 'Poppins-Regular',
  },
  image: {
    width: scale(80),
    height: verticalScale(80),
    resizeMode: 'cover',
  },
});
