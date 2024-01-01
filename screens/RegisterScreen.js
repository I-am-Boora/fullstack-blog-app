import {StyleSheet, Text, View, Pressable, Alert} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {scale, verticalScale} from 'react-native-size-matters';
import InputBox from '../src/component/InputBox';
import CustomButton from '../src/component/CustomButton';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const handleUsername = data => {
    setUsername(data);
  };
  const handlePassword = data => {
    setPassword(data);
  };
  const handleRegister = () => {
    if (!username || !password) {
      Alert.alert('Please enter data correctly !');
    }
    console.log(username, password);
  };
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={styles.container}>
        <Text style={styles.title}>Blogg App</Text>
        <Text style={styles.register}>Register in account</Text>
        <InputBox
          placeholder={'username or email address'}
          secureTextEntry={false}
          value={username}
          handleInput={handleUsername}
        />
        <InputBox
          placeholder={'Password'}
          secureTextEntry={true}
          value={password}
          handleInput={handlePassword}
        />
        <CustomButton title="Register" onPress={handleRegister} />
        <Pressable
          style={styles.bottomContainer}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={{fontSize: scale(12)}}>Alread have an account</Text>
          <Text
            style={{
              paddingHorizontal: scale(5),
              fontSize: scale(14),
              fontWeight: '500',
            }}>
            Login
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(20),
  },
  title: {
    fontSize: scale(20),
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
  },
  register: {
    fontSize: scale(18),
    fontWeight: '500',
    marginVertical: verticalScale(10),
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
