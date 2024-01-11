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
  const handlePost = () => {
    console.log(category, title, content);
  };

  const handleChoosePhoto = async () => {
    await launchImageLibrary({noData: true}, response => {
      // console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.title, {color: colors.text}]}>Create Post</Text>
      <View style={[styles.imageContainer, {borderColor: colors.secondary}]}>
        <Pressable style={styles.imageComponent} onPress={handleChoosePhoto}>
          <Icon name="image-outline" size={24} />
          <Text style={styles.imageText}>Upload image</Text>
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
      <View style={[styles.detailContainer, {borderColor: colors.secondary}]}>
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
    borderWidth: moderateScale(1),
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
