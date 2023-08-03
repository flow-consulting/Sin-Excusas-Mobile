// src/screens/FriendGroups/FriendGroupsListScreen.tsx
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  ClickableText,
  Container,
  ListContainer,
  PrimaryButton,
} from '../../components';
import {useAsyncStorage} from '../../hooks/useAsyncStorage';
import useDatabaseData from '../../hooks/useDatabaseData';

const FriendGroupsListScreen = () => {
  const [friendGroups, setFriendGroups] = useState([]);
  const navigation = useNavigation();
  const {getItem: getAsyncStorageItem, setItem: setAsyncStorageItem} =
    useAsyncStorage();
  const {query: queryFriendGroups} = useDatabaseData('friend-groups');

  const fetchFriendGroups = useCallback(async () => {
    // Get the user data from local storage
    const userData = await getAsyncStorageItem('user');
    if (userData) {
      const user = JSON.parse(userData);

      // Log the value of the userId
      console.log('FriendGroupsListScreen fetchFriendGroups userId:', user.id);

      // Get friend groups for the current user from the database using the useDatabaseData hook
      const data = await queryFriendGroups({
        members: user.id,
      });

      // Log the value of the data
      console.log('FriendGroupsListScreen fetchFriendGroups data:', data);

      // Update state with the fetched friend groups
      setFriendGroups(data);
    }
  }, [getAsyncStorageItem, queryFriendGroups]);

  // Call fetchFriendGroups when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchFriendGroups();
    }, [fetchFriendGroups]),
  );

  const handleSelectGroup = async group => {
    // Store the ID of the selected friend group in AsyncStorage
    await setAsyncStorageItem('selectedFriendGroupId', group.id);

    // Navigate to the FriendGroupsTabs and pass the selected group as a parameter
    navigation.navigate('FriendGroupsTabs', {group});
  };

  const handleCreateGroup = () => {
    // Navigate to the CreateFriendGroupScreen
    navigation.navigate('CreateFriendGroupScreen');
  };

  return (
    <Container>
      <ListContainer
        data={friendGroups}
        renderItem={({item}) => (
          <ClickableText onPress={() => handleSelectGroup(item)}>
            {item.name}
          </ClickableText>
        )}
        keyExtractor={item => item.id}
      />
      <PrimaryButton title="Create new group" onPress={handleCreateGroup} />
    </Container>
  );
};

export default FriendGroupsListScreen;
