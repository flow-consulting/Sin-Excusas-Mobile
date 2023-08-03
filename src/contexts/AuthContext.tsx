// src/contexts/AuthContext.tsx
import React, {createContext, useState} from 'react';
import {AuthContextValue} from '../interfaces/AuthContextValue';

const AuthContext = createContext<AuthContextValue>({
  userId: null,
  setUserId: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const AuthProvider: React.FC = ({children}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Add a console.log here to check the value of userId and isLoggedIn
  console.log('AuthProvider userId:', userId);
  console.log('AuthProvider isLoggedIn:', isLoggedIn);

  return (
    <AuthContext.Provider
      value={{
        userId,
        setUserId,
        isLoggedIn,
        setIsLoggedIn,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
