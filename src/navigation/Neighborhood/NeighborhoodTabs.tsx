// src/navigation/Neighborhood/NeighborhoodTabs.tsx
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import VendotodoScreen from '../../screens/Neighborhood/VendotodoScreen';
import AlquicashScreen from '../../screens/Neighborhood/AlquicashScreen';
import ServicesScreen from '../../screens/Neighborhood/ServicesScreen';
import PasanakusScreen from '../../screens/Neighborhood/PasanakusScreen';
import NeighborhoodScreen from '../../screens/Neighborhood/NeighborhoodScreen';

const Tab = createBottomTabNavigator();

const NeighborhoodTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="NeighborhoodScreen" component={NeighborhoodScreen} />
    <Tab.Screen name="VendotodoScreen" component={VendotodoScreen} />
    <Tab.Screen name="AlquicashScreen" component={AlquicashScreen} />
    <Tab.Screen name="ServicesScreen" component={ServicesScreen} />
    <Tab.Screen name="PasanakusScreen" component={PasanakusScreen} />
  </Tab.Navigator>
);

export default NeighborhoodTabs;
