// src/screens/Profile/ProfileScreen.tsx
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {CustomButton, CustomText, CustomView} from '../../components';
import {useAuth} from '../../hooks/useAuth';

const ProfileScreen = () => {
  const {logout} = useAuth();
  const navigation = useNavigation();

  return (
    <CustomView type="screen">
      <CustomText type="normal">ProfileScreen</CustomText>
      <CustomButton
        type="primary"
        title="Edit Profile"
        onPress={() => navigation.navigate('EditProfileScreen')}
      />
      <CustomButton type="primary" title="Logout" onPress={logout} />
    </CustomView>
  );
};

export default ProfileScreen;
