// src/navigation/Neighborhood/NeighborhoodTabs.tsx
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import AlquicashScreen from '../../screens/Neighborhood/AlquicashScreen';
import NeighborhoodScreen from '../../screens/Neighborhood/NeighborhoodScreen';
import VendotodoScreen from '../../screens/Neighborhood/VendotodoScreen';
import PasanakusScreen from '../../screens/Shared/PasanakusScreen';
import AdStack from '../Ad/AdStack';

const Tab = createBottomTabNavigator();

const NeighborhoodTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="NeighborhoodScreen" component={NeighborhoodScreen} />
    <Tab.Screen name="VendotodoScreen" component={VendotodoScreen} />
    <Tab.Screen name="AlquicashScreen" component={AlquicashScreen} />
    <Tab.Screen name="AdStack" component={AdStack} />
    <Tab.Screen name="PasanakusScreen" component={PasanakusScreen} />
  </Tab.Navigator>
);

export default NeighborhoodTabs;
