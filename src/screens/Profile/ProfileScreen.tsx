// src/screens/Profile/ProfileScreen.tsx
import React from 'react';
import {Text, View} from 'react-native';
import NextScreenButton from '../../components/NextScreenButton';

const ProfileScreen = () => {
  return (
    <View>
      <Text>ProfileScreen</Text>
      <NextScreenButton
        nextScreen="EditProfileScreen"
        buttonText="Go to next screen"
      />
    </View>
  );
};

export default ProfileScreen;
