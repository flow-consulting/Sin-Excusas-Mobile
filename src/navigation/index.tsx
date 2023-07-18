// src/navigation/index.tsx
import {NavigationContainer} from '@react-navigation/native';
import React, {useContext} from 'react';
import AuthContext from '../contexts/AuthContext';
import AuthStack from './Auth/AuthStack';
import HomeDrawer from './Home/HomeDrawer';

const AppNavigator = () => {
  const {isLoggedIn} = useContext(AuthContext);

  return (
    <NavigationContainer>
      {isLoggedIn ? <HomeDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
