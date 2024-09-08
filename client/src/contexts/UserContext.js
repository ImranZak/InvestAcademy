import { createContext } from 'react';

const UserContext = createContext({
  user: null,
  setUser: () => {},
  updateHighScore: false,
  setUpdateHighScore: () => {} 
});

export default UserContext;