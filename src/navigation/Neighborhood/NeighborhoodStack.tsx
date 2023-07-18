// src/navigation/Neighborhood/NeighborhoodStack.tsx
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import CreateNeighborhoodScreen from '../../screens/Neighborhood/CreateNeighborhoodScreen';
import NeighborhoodScreen from '../../screens/Neighborhood/NeighborhoodScreen';

const Stack = createStackNavigator();

const NeighborhoodStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="NeighborhoodScreen" component={NeighborhoodScreen} />
    <Stack.Screen
      name="CreateNeighborhoodScreen"
      component={CreateNeighborhoodScreen}
    />
  </Stack.Navigator>
);

export default NeighborhoodStack;
