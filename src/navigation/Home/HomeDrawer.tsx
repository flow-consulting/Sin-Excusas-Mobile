// src/navigation/Home/HomeDrawer.tsx
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import HomeScreen from '../../screens/Home/HomeScreen';
import FriendGroupsStack from '../FriendGroups/FriendGroupsStack';
import NeighborhoodTabs from '../Neighborhood/NeighborhoodTabs';
import ProfileStack from '../Profile/ProfileStack';

const Drawer = createDrawerNavigator();

const HomeDrawer = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="HomeScreen" component={HomeScreen} />
    <Drawer.Screen name="ProfileStack" component={ProfileStack} />
    <Drawer.Screen name="NeighborhoodTabs" component={NeighborhoodTabs} />
    <Drawer.Screen name="FriendGroupsStack" component={FriendGroupsStack} />
  </Drawer.Navigator>
);

export default HomeDrawer;
