import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import InputBox from '../src/component/InputBox';
import CustomButton from '../src/component/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {nativeViewGestureHandlerProps} from 'react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler';
import {userContext} from '../src/utils/UserContextProvider';

const PostScreen = () => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState(null);
  const [postData, setPostData] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const {colors} = useTheme();
  const {loginInfo} = useContext(userContext);

  const handleCategory = data => {
    setCategory(data);
  };

  const handleTitle = data => {
    setTitle(data);
  };
  // const uploadImage = async () => {
  //   const formData = new FormData();
  //   formData.append('photo', {
  //     uri: photo.assets[0].uri,
  //     type: photo.assets[0].type,
  //     name: photo.assets[0].fileName,
  //   });

  //   try {
  //     const response = await axios.post(
  //       'http://10.0.2.2:8080/users/createPost',
  //       formData,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       },
  //     );

  //     console.log('Image uploaded successfully', response.data);
  //   } catch (error) {
  //     console.error('Error uploading image', error);
  //   }
  // };
  const Posted = () => {
    return (
      <View
        style={{
          backgroundColor: '#f5f5f5',
          width: '80%',
          height: 200,
          position: 'absolute',
          top: '50%',
          alignSelf: 'center',
          borderRadius: moderateScale(15),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon name="checkmark-circle-outline" size={80} color="green" />
        <Text
          style={{
            fontSize: moderateScale(16),
            fontWeight: '500',
            fontFamily: 'Poppins-Medium',
            marginTop: verticalScale(10),
          }}>
          Posted successfully
        </Text>
      </View>
    );
  };

  const Loading = () => {
    return (
      <View
        style={{
          backgroundColor: '#f5f5f5',
          width: '80%',
          height: 200,
          position: 'absolute',
          top: '50%',
          alignSelf: 'center',
          borderRadius: moderateScale(15),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size={60} color={'#3d5afe'} />
        <Text
          style={{
            fontSize: moderateScale(16),
            fontWeight: '500',
            fontFamily: 'Poppins-Medium',
            marginTop: verticalScale(10),
          }}>
          Creating Post
        </Text>
      </View>
    );
  };
  const handlePost = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('author', loginInfo?.user?._id);
    if (photo && photo.assets) {
      formData.append('photo', {
        uri: photo.assets[0].uri,
        type: photo.assets[0].type,
        name: photo.assets[0].fileName,
      });
    }

    try {
      setShowBanner(true);
      const response = await axios.post(
        'http://10.0.2.2:8080/users/createPost',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 15000,
        },
      );

      console.log('Image uploaded successfully', response.data);
      setPostData(response.data);
    } catch (error) {
      console.error('Error uploading image', error);
      setShowBanner(false);
    }
  };
  const renderBanner = () => {
    if (showBanner) {
      if (postData) {
        return <Posted />;
      } else {
        return <Loading />;
      }
    }
    return null; // Return null if showBanner is false
  };
  useEffect(() => {
    if (postData) {
      var timeoutId = setTimeout(() => {
        setShowBanner(false);
      }, 3000);
    }
    // Clear the timeout if the component unmounts or showBanner changes
    return () => clearTimeout(timeoutId);
  }, [showBanner, postData]);

  const handleChoosePhoto = async () => {
    await launchImageLibrary({noData: true}, response => {
      // console.log(response);
      if (response && response.assets) {
        setPhoto(response);
      }
    });
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.title, {color: colors.text}]}>Create Post</Text>
      <View style={[styles.imageContainer, {borderColor: colors.borderColor}]}>
        <Pressable style={styles.imageComponent} onPress={handleChoosePhoto}>
          <Icon name="image-outline" size={24} />
          {photo && photo.assets ? (
            <Text style={styles.imageText}>{photo.assets[0].fileName}</Text>
          ) : (
            <Text style={styles.imageText}>Upload image</Text>
          )}
        </Pressable>
      </View>
      <InputBox
        placeholder="category"
        handleInput={handleCategory}
        value={category}
        secureTextEntry={false}
      />
      <InputBox
        placeholder="Title"
        handleInput={handleTitle}
        value={title}
        secureTextEntry={false}
      />
      <View style={[styles.detailContainer, {borderColor: colors.borderColor}]}>
        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholder="write your blog..."
          style={styles.input}
          value={content}
          onChangeText={text => setContent(text)}
        />
      </View>
      <CustomButton title="Post" onPress={handlePost} />
      {renderBanner()}
    </ScrollView>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(10),
  },
  title: {
    fontSize: moderateScale(40),
    fontFamily: 'Lora-VariableFont_wght',
    marginVertical: verticalScale(10),
  },
  detailContainer: {
    borderWidth: moderateScale(0.7),
    borderRadius: moderateScale(8),
    padding: scale(10),
    marginVertical: verticalScale(10),
  },
  input: {
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-Regular',
    width: '95%',
  },
  imageContainer: {
    borderWidth: moderateScale(0.7),
    borderRadius: moderateScale(7),

    justifyContent: 'center',
    marginVertical: verticalScale(5),
  },
  imageComponent: {
    flexDirection: 'row',
    padding: scale(10),
  },
  imageText: {
    fontSize: moderateScale(14),
    paddingLeft: scale(10),
  },
});
