// src/screens/Auth/LoginScreen.tsx
import React from 'react';
import {Text, View} from 'react-native';
import NextScreenButton from '../../components/NextScreenButton';

const LoginScreen = () => {
  return (
    <View>
      <Text>LoginScreen</Text>
      <NextScreenButton
        nextScreen="RegisterScreen"
        buttonText="Go to next screen"
      />
    </View>
  );
};

export default LoginScreen;
