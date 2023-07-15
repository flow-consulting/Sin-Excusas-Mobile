// src/navigation/FriendGroups/FriendGroupsTabs.tsx
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ServicesScreen from '../../screens/FriendGroups/ServicesScreen';
import PasanakusScreen from '../../screens/FriendGroups/PasanakusScreen';
import FriendGroupsScreen from '../../screens/FriendGroups/FriendGroupsScreen';

const Tab = createBottomTabNavigator();

const FriendGroupsTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="FriendGroupsScreen" component={FriendGroupsScreen} />
    <Tab.Screen name="ServicesScreen" component={ServicesScreen} />
    <Tab.Screen name="PasanakusScreen" component={PasanakusScreen} />
  </Tab.Navigator>
);

export default FriendGroupsTabs;
