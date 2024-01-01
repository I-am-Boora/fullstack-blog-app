import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
// import {color} from '../utils/theme';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';

const CustomButton = ({onPress, title}) => {
  const {colors} = useTheme();

  return (
    <Pressable
      style={[styles.btnContainer, {backgroundColor: colors.primary}]}
      onPress={onPress}>
      <Text style={[styles.btn, {color: colors.btnText}]}>{title}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btnContainer: {
    // backgroundColor: colors.background,
    padding: moderateScale(10),
    borderRadius: moderateScale(8),
    width: '100%',
    alignItems: 'center',
    marginTop: verticalScale(5),
    marginBottom: verticalScale(5),
  },
  btn: {
    // color: color.white,
    fontSize: scale(18),
    fontWeight: '500',
  },
});
