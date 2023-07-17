// src/navigation/AdStack.tsx
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AdDetailsScreen from '../../screens/Ad/AdDetailsScreen';
import CreateAdScreen from '../../screens/Ad/CreateAdScreen';
import ReportAdScreen from '../../screens/Ad/ReportAdScreen';
import ServicesScreen from '../../screens/Shared/ServicesScreen';

const Stack = createStackNavigator();

const AdStack = () => {
  return (
    <Stack.Navigator initialRouteName="Services">
      <Stack.Screen name="ServicesScreen" component={ServicesScreen} />
      <Stack.Screen name="CreateAdScreen" component={CreateAdScreen} />
      <Stack.Screen name="ReportAdScreen" component={ReportAdScreen} />
      <Stack.Screen name="AdDetailsScreen" component={AdDetailsScreen} />
    </Stack.Navigator>
  );
};

export default AdStack;
