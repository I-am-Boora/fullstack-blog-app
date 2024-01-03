import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useState} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import InputBox from '../src/component/InputBox';
import CustomButton from '../src/component/CustomButton';
import {useNavigation, useTheme} from '@react-navigation/native';
import axios from 'axios';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);
  const navigation = useNavigation();
  const {colors} = useTheme();
  const loginUsername = data => {
    setUsername(data);
  };
  const loginPassword = data => {
    setPassword(data);
  };
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Please enter correct value!');
    }
    await axios
      .post(
        'http://10.0.2.2:8080/users/login',
        {
          username: username,
          password: password,
        },
        {maxRedirects: 5},
      )
      .then(function (response) {
        console.log(response);
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // const result = await axios.post('http://192.168.62.248:8080/users/login', {
    //   username,
    //   password,
    // });
    // console.log(result);
    setUsername('');
    setPassword('');
  };
  const handleSignUp = () => {
    navigation.navigate('Register');
  };
  console.log(data);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <View style={styles.container}>
        <Text style={[styles.title, {color: colors.text}]}>Blogg App</Text>
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
