// src/screens/FriendGroups/CreateFriendGroupScreen.tsx
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import AuthContext from '../../contexts/AuthContext';
import dbManager from '../../interfaces/DatabaseManager';

const CreateFriendGroupScreen = () => {
  const [name, setName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const navigation = useNavigation();
  const {userId} = useContext(AuthContext);

  const handleSaveGroup = async () => {
    // Check if the userId is defined
    if (!userId) {
      // If the userId is not defined, show an error message and return
      Alert.alert('Error', 'You must be logged in to create a friend group.');
      return;
    }

    // Log the value of the userId
    console.log('User ID:', userId);

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

    // Save the new friend group to the database and get its ID
    const groupId = await dbManager.add('friend-groups', newGroup);

    // Log the value of the generated ID
    console.log('Generated ID:', groupId);

    // Get the user object from the database
    const user = await dbManager.get('users', 'id', userId);

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
    const {_id, ...updatedUserWithoutId} = updatedUser;
    await dbManager.update('users', userId, updatedUserWithoutId);

    // Navigate back to the FriendGroupsList screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Is Private:</Text>
        <Switch value={isPrivate} onValueChange={setIsPrivate} />
      </View>
      <Button title="Save Group" onPress={handleSaveGroup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default CreateFriendGroupScreen;
