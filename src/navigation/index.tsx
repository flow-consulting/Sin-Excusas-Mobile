// src/navigation/index.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeDrawer from './Home/HomeDrawer';

const AppNavigator = () => {
  // Use either the Auth or App stack depending on the user's authentication state
  // For example:
  // const isLoggedIn = useAuth();
  // return isLoggedIn ? <HomeDrawer /> : <AuthStack />;
  // For now, we'll just use the App stack
  // return <HomeDrawer />;
  return (
    <NavigationContainer>
      <HomeDrawer />
    </NavigationContainer>
  );
};

export default AppNavigator;
