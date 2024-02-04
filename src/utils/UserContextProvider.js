import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {createContext, useEffect, useState} from 'react';

const userContext = createContext();

const UserContextProvider = ({children}) => {
  const [posts, setPosts] = useState([]);
  const [loginInfo, setLoginInfo] = useState(null);
  const [deletePost, setDeletePost] = useState(0);

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      const userId = await AsyncStorage.getItem('userId');
      // Fetch user data based on the token and setLoginInfo

      const response = await axios.get(
        `http:10.0.2.2:8080/users/getUserInfo/${userId}`,
      );

      if (response.data) {
        setLoginInfo(response.data);
        if (response.data.user.posts) {
          setDeletePost(response.data.user.posts.length);
        }
      }
    }
  };
  useEffect(() => {
    checkLoginStatus();
  }, [deletePost]);
  return (
    <userContext.Provider
      value={{
        posts,
        setPosts,
        loginInfo,
        setLoginInfo,
        deletePost,
        setDeletePost,
      }}>
      {children}
    </userContext.Provider>
  );
};

export {UserContextProvider, userContext};
