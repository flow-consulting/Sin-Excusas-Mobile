// src/navigation/FriendGroups/FriendGroupsTabs.tsx
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import FriendGroupsScreen from '../../screens/FriendGroups/FriendGroupsScreen';
import PasanakusScreen from '../../screens/Shared/PasanakusScreen';
import AdStack from '../Ad/AdStack';

const Tab = createBottomTabNavigator();

const FriendGroupsTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="FriendGroupsScreen" component={FriendGroupsScreen} />
    <Tab.Screen
      name="AdStack"
      component={AdStack}
      initialParams={{adType: 'Services', context: 'friendGroup'}}
    />
    <Tab.Screen name="PasanakusScreen" component={PasanakusScreen} />
  </Tab.Navigator>
);

export default FriendGroupsTabs;
