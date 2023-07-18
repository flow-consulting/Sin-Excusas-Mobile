// src/navigation/Auth/AuthStack.tsx
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../../screens/Auth/LoginScreen';
import RegisterScreen from '../../screens/Auth/RegisterScreen';
import WelcomeScreen from '../../screens/Auth/WelcomeScreen';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
  </Stack.Navigator>
);

export default AuthStack;
