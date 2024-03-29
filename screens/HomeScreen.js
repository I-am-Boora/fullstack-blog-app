import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  FlatList,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import PostComponent from '../src/component/PostComponent';
import {userContext} from '../src/utils/UserContextProvider';
import axios from 'axios';
import {calculateTimeAgo} from '../src/utils/utilityFunction';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const {colors} = useTheme();

  const {posts, setPosts, deletePost} = useContext(userContext);
  const getAllPosts = useCallback(async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8080/users/allPosts');
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [deletePost]);
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const logout = async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userId');
    navigation.navigate('Login');
  };
  const renderHeader = () => {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, {color: colors.text}]}>Discover</Text>
        <Text
          onPress={() => {
            logout();
          }}>
          Logout
        </Text>
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
          <TextInput
            placeholder="search here"
            style={styles.inputText}
            value={search}
            onChangeText={text => setSearch(text)}
            onFocus={() => console.log('TextInput focused')}
            onBlur={() => console.log('TextInput blurred')}
          />
          <Icon name="search" size={24} />
        </View>
        <Text style={[styles.headingTitle, {color: colors.text}]}>
          Latest Blog
        </Text>
      </View>
    );
  };
  return (
    <FlatList
      data={posts.data}
      renderItem={({item, index}) => (
        <PostComponent
          item={item}
          navigation={navigation}
          calculateTimeAgo={calculateTimeAgo}
        />
      )}
      keyExtractor={item => item._id}
      ListHeaderComponent={renderHeader}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(15),
  },
  title: {
    fontSize: moderateScale(40),
    fontFamily: 'Lora-VariableFont_wght',
    marginVertical: verticalScale(10),
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
