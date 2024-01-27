import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {createContext, useEffect, useState} from 'react';

const userContext = createContext();

const UserContextProvider = ({children}) => {
  const [posts, setPosts] = useState([]);
  const [loginInfo, setLoginInfo] = useState(null);
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        // Fetch user data based on the token and setLoginInfo
        const user = await axios.get(
          `http:10.0.2.2:8080/users/getUserInfo/${token}`,
        );
        // setLoginInfo(user);
        console.log(user);
      }
    };

    checkLoginStatus();
  }, []);
  return (
    <userContext.Provider value={{posts, setPosts, loginInfo, setLoginInfo}}>
      {children}
    </userContext.Provider>
  );
};

export {UserContextProvider, userContext};
