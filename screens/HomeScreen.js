import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {moderateScale, scale} from 'react-native-size-matters';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useTheme} from '@react-navigation/native';
import {gridData} from '../src/utils/data';
const HomeScreen = () => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover</Text>
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
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(15),
  },
  title: {
    fontSize: scale(35),
    fontFamily: 'Lora-VariableFont_wght',
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
});
