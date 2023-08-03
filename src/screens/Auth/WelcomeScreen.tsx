// src/screens/Auth/WelcomeScreen.tsx
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {CustomButton, CustomText, CustomView} from '../../components';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  console.log('WelcomeScreen.tsx', 'WelcomeScreen', 'navigation', navigation);

  const handleRegisterPress = () => {
    console.log('WelcomeScreen.tsx', 'handleRegisterPress');
    navigation.navigate('RegisterScreen');
  };

  const handleLoginPress = () => {
    console.log('WelcomeScreen.tsx', 'handleLoginPress');
    navigation.navigate('LoginScreen');
  };

  return (
    <CustomView type="screen">
      <CustomText type="normal">Welcome to the app!</CustomText>
      <CustomButton
        type="primary"
        title="Register"
        onPress={handleRegisterPress}
      />
      <CustomButton type="secondary" title="Login" onPress={handleLoginPress} />
    </CustomView>
  );
};

export default WelcomeScreen;
