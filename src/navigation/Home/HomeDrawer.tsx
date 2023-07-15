// src/navigation/Home/HomeDrawer.tsx
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../../screens/Home/HomeScreen';
import ProfileStack from '../Profile/ProfileStack';
import NeighborhoodTabs from '../Neighborhood/NeighborhoodTabs';
import FriendGroupsTabs from '../FriendGroups/FriendGroupsTabs';

const Drawer = createDrawerNavigator();

const HomeDrawer = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="HomeScreen" component={HomeScreen} />
    <Drawer.Screen name="ProfileStack" component={ProfileStack} />
    <Drawer.Screen name="NeighborhoodTabs" component={NeighborhoodTabs} />
    <Drawer.Screen name="FriendGroupsTabs" component={FriendGroupsTabs} />
  </Drawer.Navigator>
);

export default HomeDrawer;
