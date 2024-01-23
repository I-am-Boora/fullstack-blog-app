import {StyleSheet, Text, View, Pressable, Alert, Keyboard} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {scale, verticalScale} from 'react-native-size-matters';
import InputBox from '../src/component/InputBox';
import CustomButton from '../src/component/CustomButton';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const handleUsername = data => {
    setUsername(data);
  };
  const handlePassword = data => {
    setPassword(data);
  };
  const handlefullName = data => {
    setFullName(data);
  };
  const handleEmail = data => setEmail(data);
  const handleRegister = async () => {
    if (!(username || password || email || fullName)) {
      Alert.alert('All fields are required !');
    }
    await axios
      .post(
        'http://10.0.2.2:8080/users/register',
        {
          username,
          password,
          fullName,
          email,
        },
        {maxRedirects: 5},
      )
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    setFullName('');
    setUsername('');
    setEmail('');
    setPassword('');
    Keyboard.dismiss();
  };
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={styles.container}>
        <Text style={[styles.title, {color: Colors.text}]}>Blogg App</Text>
        <Text style={[styles.register, {color: Colors.text}]}>
          Register in account
        </Text>
        {/* <Text style={[styles.inputTitle, {color: Colors.text}]}>Full Name</Text> */}
        <InputBox
          placeholder={'Enter full name'}
          secureTextEntry={false}
          value={fullName}
          handleInput={handlefullName}
        />
        <InputBox
          placeholder={'username'}
          secureTextEntry={false}
          value={username}
          handleInput={handleUsername}
        />
        <InputBox
          placeholder={'email address'}
          secureTextEntry={false}
          value={email}
          handleInput={handleEmail}
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
  // inputTitle: {
  //   fontSize: scale(15),
  //   alignSelf: 'flex-start',
  // },
});
