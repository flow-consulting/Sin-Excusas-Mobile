// src/screens/Auth/WelcomeScreen.tsx
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, Text, View} from 'react-native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Welcome to the app!</Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate('RegisterScreen')}
      />
      <Button
        title="Login"
        onPress={() => navigation.navigate('LoginScreen')}
      />
    </View>
  );
};

export default WelcomeScreen;
