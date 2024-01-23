import {createContext, useState} from 'react';

const userContext = createContext();

const UserContextProvider = ({children}) => {
  const [posts, setPosts] = useState([]);
  const [loginInfo, setLoginInfo] = useState(null);
  return (
    <userContext.Provider value={{posts, setPosts}}>
      {children}
    </userContext.Provider>
  );
};

export {UserContextProvider, userContext};
