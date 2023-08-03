// src/screens/FriendGroups/CreateFriendGroupScreen.tsx
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {
  Container,
  CustomAlert,
  CustomSwitch,
  CustomTextInput,
  PrimaryButton,
} from '../../components';
import AuthContext from '../../contexts/AuthContext';
import useDatabaseData from '../../hooks/useDatabaseData';

const CreateFriendGroupScreen = () => {
  const [name, setName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const navigation = useNavigation();
  const {userId} = useContext(AuthContext);
  const {add: addFriendGroup} = useDatabaseData('friend-groups');
  const {get: getUser, update: updateUser} = useDatabaseData('users');

  const handleSaveGroup = async () => {
    // Check if the userId is defined
    if (!userId) {
      // If the userId is not defined, show an error message and return
      CustomAlert({
        title: 'Error',
        message: 'You must be logged in to create a friend group.',
      });
      return;
    }

    // Generate a random share code with 5 characters
    const shareCode = Math.random().toString(36).substr(2, 5);

    // Create a new friend group object
    const newGroup = {
      name,
      isPrivate,
      shareCode,
      createdAt: new Date().toISOString(),
      createdBy: userId,
      members: [userId],
      // Add any other properties that a friend group should have
    };

    // Save the new friend group to the database
    const storedGroup = await addFriendGroup(newGroup);
    const groupId = storedGroup.id;

    // Get the user object from the database
    const user = await getUser('id', userId);

    // Check if the user object has the friendGroupIds property
    if (!user.friendGroupIds) {
      // If the user object does not have the friendGroupIds property, add it and assign an initial value (an empty array)
      user.friendGroupIds = [];
    }

    // Update the user's friendGroupIds to include the new group's ID
    const updatedUser = {
      ...user,
      friendGroupIds: [...user.friendGroupIds, groupId],
    };

    // Update the user object in the database
    await updateUser(userId, updatedUser);

    // Navigate back to the FriendGroupsList screen
    navigation.goBack();
  };

  return (
    <Container>
      <CustomTextInput value={name} onChangeText={setName} placeholder="Name" />
      <CustomSwitch value={isPrivate} onValueChange={setIsPrivate} />
      <PrimaryButton title="Save Group" onPress={handleSaveGroup} />
    </Container>
  );
};

export default CreateFriendGroupScreen;
