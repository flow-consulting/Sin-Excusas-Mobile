// src/screens/Profile/ProfileScreen.tsx
import React from 'react';
import {Button, Text, View} from 'react-native';
import NextScreenButton from '../../components/NextScreenButton';
import {useAuth} from '../../hooks/useAuth';
import {useNeighborhood} from '../../hooks/useNeighborhood';

const ProfileScreen = () => {
  const {logout, user} = useAuth();
  const userId = user?.id;
  const {deleteNeighborhood} = useNeighborhood();

  const handleDeleteNeighborhood = async () => {
    if (userId) {
      await deleteNeighborhood(userId);
    }
  };

  return (
    <View>
      <Text>ProfileScreen</Text>
      <NextScreenButton
        nextScreen="EditProfileScreen"
        buttonText="Go to next screen"
      />
      <Button title="Delete Neighborhood" onPress={handleDeleteNeighborhood} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default ProfileScreen;
