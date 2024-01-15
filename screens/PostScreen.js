import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import InputBox from '../src/component/InputBox';
import CustomButton from '../src/component/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

const PostScreen = () => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState(null);
  const {colors} = useTheme();
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

  const handlePost = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('photo', {
      uri: photo.assets[0].uri,
      type: photo.assets[0].type,
      name: photo.assets[0].fileName,
    });
    try {
      const response = await axios.post(
        'http://10.0.2.2:8080/users/createPost',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('Image uploaded successfully', response.data);
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  const handleChoosePhoto = async () => {
    await launchImageLibrary({noData: true}, response => {
      // console.log(response);
      if (response && response.assets) {
        setPhoto(response);
      }
    });
  };
  // console.log(photo.assets[0].fileName);
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
