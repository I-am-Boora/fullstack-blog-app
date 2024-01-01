import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';

const InputBox = ({placeholder, secureTextEntry, value, handleInput}) => {
  const {colors} = useTheme();
  console.log(colors);
  return (
    <View style={[styles.inputContainer, {borderColor: colors.borderColor}]}>
      <TextInput
        placeholder={placeholder}
        style={styles.inputBox}
        secureTextEntry={secureTextEntry}
        onChangeText={text => {
          handleInput(text);
        }}
        placeholderTextColor={colors.text}
        value={value}
      />
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(8),
    width: '100%',
    marginVertical: verticalScale(10),
  },
  inputBox: {
    paddingLeft: scale(20),
    fontSize: scale(15),
  },
});
