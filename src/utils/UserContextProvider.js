import {createContext, useState} from 'react';

const userContext = createContext();

const UserContextProvider = ({children}) => {
  const [posts, setPosts] = useState([]);
  const [loginInfo, setLoginInfo] = useState(null);
  return (
    <userContext.Provider value={{posts, setPosts, loginInfo, setLoginInfo}}>
      {children}
    </userContext.Provider>
  );
};

export {UserContextProvider, userContext};
