import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useState} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import InputBox from '../src/component/InputBox';
import CustomButton from '../src/component/CustomButton';
import {useNavigation, useTheme} from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const {colors} = useTheme();
  const loginUsername = data => {
    setUsername(data);
  };
  const loginPassword = data => {
    setPassword(data);
  };
  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Please enter correct value!');
    }
    console.log(username, password);
    setUsername('');
    setPassword('');
  };
  const handleSignUp = () => {
    navigation.navigate('Register');
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <View style={styles.container}>
        <Text style={styles.title}>Blogg App</Text>
        <Text style={[styles.login, {color: colors.text}]}>
          Login in account
        </Text>
        <InputBox
          placeholder={'username or email address'}
          secureTextEntry={false}
          value={username}
          handleInput={loginUsername}
        />
        <InputBox
          placeholder={'password'}
          secureTextEntry={true}
          value={password}
          handleInput={loginPassword}
        />
        <CustomButton onPress={handleLogin} title="Login" />
        <CustomButton onPress={handleSignUp} title="Sign Up" />
        <Text style={styles.forgotPassword}>Forgotten Password ?</Text>
      </View>
    </View>
  );
};

export default LoginScreen;

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
  login: {
    fontSize: scale(18),
    fontWeight: '500',
    marginVertical: verticalScale(10),
  },
});
