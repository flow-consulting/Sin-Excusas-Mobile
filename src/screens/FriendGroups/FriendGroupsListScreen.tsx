import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useContext, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AuthContext from '../../contexts/AuthContext';
import dbManager from '../../interfaces/DatabaseManager';

const FriendGroupsListScreen = () => {
  const [friendGroups, setFriendGroups] = useState([]);
  const navigation = useNavigation();
  const {userId} = useContext(AuthContext);

  const fetchFriendGroups = useCallback(async () => {
    // Log the value of the userId
    console.log('UserId:', userId);

    // Get all friend groups from the database
    const data = await dbManager.getAll('friend-groups');

    // Log the value of the data
    console.log('Data:', data);

    // Filter friend groups based on the user's friendGroupIds
    const filteredGroups = data.filter(
      group => group.members && group.members.includes(userId),
    );

    // Log the value of the filtered friend groups
    console.log('Filtered Friend Groups:', filteredGroups);

    // Update state with the filtered friend groups
    setFriendGroups(filteredGroups);
  }, [userId]);

  // Call fetchFriendGroups when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchFriendGroups();
    }, [fetchFriendGroups]),
  );

  const handleSelectGroup = async group => {
    // Store the ID of the selected friend group in AsyncStorage
    await AsyncStorage.setItem('selectedFriendGroupId', group.id);

    // Navigate to the FriendGroupsTabs and pass the selected group as a parameter
    navigation.navigate('FriendGroupsTabs', {group});
  };

  const handleCreateGroup = () => {
    // Navigate to the CreateFriendGroupScreen
    navigation.navigate('CreateFriendGroupScreen');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={friendGroups}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleSelectGroup(item)}>
            <Text style={styles.groupName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.createButton} onPress={handleCreateGroup}>
        <Text style={styles.createButtonText}>Create new group</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  groupName: {
    fontSize: 18,
    marginBottom: 8,
  },
  createButton: {
    backgroundColor: '#4da6ff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FriendGroupsListScreen;
