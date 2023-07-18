// src/navigation/FriendGroups/FriendGroupsStack.tsx
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import CreateFriendGroupScreen from '../../screens/FriendGroups/CreateFriendGroupScreen';
import FriendGroupsListScreen from '../../screens/FriendGroups/FriendGroupsListScreen';
import FriendGroupsTabs from './FriendGroupsTabs';

const Stack = createStackNavigator();

const FriendGroupsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="FriendGroupsListScreen"
      component={FriendGroupsListScreen}
    />
    <Stack.Screen
      name="CreateFriendGroupScreen"
      component={CreateFriendGroupScreen}
    />
    <Stack.Screen name="FriendGroupsTabs" component={FriendGroupsTabs} />
  </Stack.Navigator>
);

export default FriendGroupsStack;
