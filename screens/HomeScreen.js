import {StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useTheme} from '@react-navigation/native';
import {gridData} from '../src/utils/data';
import InputBox from '../src/component/InputBox';
import Icon from 'react-native-vector-icons/Ionicons';
import PostComponent from '../src/component/PostComponent';
// import {TextInput} from 'react-native-gesture-handler';
const HomeScreen = () => {
  const {colors} = useTheme();
  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.title, {color: colors.text}]}>Discover</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator
        contentContainerStyle={{columnGap: 8}}>
        {gridData.map(item => {
          return (
            <View
              style={[
                styles.categoryContainer,
                {backgroundColor: colors.secondary},
              ]}
              key={item.id}>
              <Text
                style={[
                  styles.categoryText,
                  {fontFamily: 'Roboto-Medium', color: colors.text},
                ]}>
                {item.category}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <View style={[styles.inputContainer, {borderColor: colors.borderColor}]}>
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
    // padding: scale(10),

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
    borderWidth: moderateScale(0.7),
    borderRadius: moderateScale(15),
    marginVertical: verticalScale(10),
  },
  inputText: {
    fontSize: moderateScale(15),
  },
  headingTitle: {
    fontSize: moderateScale(18),
    fontFamily: 'Roboto-Bold',
  },
});
