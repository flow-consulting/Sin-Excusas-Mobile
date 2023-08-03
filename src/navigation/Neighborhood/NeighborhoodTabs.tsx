// src/navigation/Neighborhood/NeighborhoodTabs.tsx
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import PasanakusScreen from '../../screens/Shared/PasanakusScreen';
import AdStack from '../Ad/AdStack';
import NeighborhoodStack from '../Neighborhood/NeighborhoodStack';

const Tab = createBottomTabNavigator();

const NeighborhoodTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Neighborhood" component={NeighborhoodStack} />
    <Tab.Screen
      name="Vendotodo"
      component={AdStack}
      initialParams={{adType: 'Vendotodo'}}
    />
    <Tab.Screen
      name="Alquicash"
      component={AdStack}
      initialParams={{adType: 'Alquicash'}}
    />
    <Tab.Screen
      name="Services"
      component={AdStack}
      initialParams={{adType: 'Services', context: 'neighborhood'}}
    />
    <Tab.Screen name="PasanakusScreen" component={PasanakusScreen} />
  </Tab.Navigator>
);

export default NeighborhoodTabs;
