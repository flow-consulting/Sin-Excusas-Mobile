// src/navigation/Ad/AdStack.tsx
import {useRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useNeighborhood} from '../../hooks/useNeighborhood';
import AdDetailsScreen from '../../screens/Ad/AdDetailsScreen';
import CreateAdScreen from '../../screens/Ad/CreateAdScreen';
import ReportAdScreen from '../../screens/Ad/ReportAdScreen';
import AlquicashScreen from '../../screens/Neighborhood/AlquicashScreen';
import VendotodoScreen from '../../screens/Neighborhood/VendotodoScreen';
import ServicesScreen from '../../screens/Shared/ServicesScreen';

const Stack = createStackNavigator();

const AdStack = () => {
  const route = useRoute();
  const {adType} = route.params;
  console.log('AdStack adType:', adType);

  const {neighborhoodId} = useNeighborhood();
  console.log('AdStack neighborhoodId:', neighborhoodId);

  return (
    <Stack.Navigator>
      {neighborhoodId && adType === 'Vendotodo' && (
        <>
          <Stack.Screen name="VendotodoScreen" component={VendotodoScreen} />
          <Stack.Screen name="CreateAdScreen" component={CreateAdScreen} />
          <Stack.Screen name="ReportAdScreen" component={ReportAdScreen} />
          <Stack.Screen name="AdDetailsScreen" component={AdDetailsScreen} />
        </>
      )}
      {neighborhoodId && adType === 'Alquicash' && (
        <>
          <Stack.Screen name="AlquicashScreen" component={AlquicashScreen} />
          <Stack.Screen name="CreateAdScreen" component={CreateAdScreen} />
          <Stack.Screen name="ReportAdScreen" component={ReportAdScreen} />
          <Stack.Screen name="AdDetailsScreen" component={AdDetailsScreen} />
        </>
      )}
      {neighborhoodId && adType === 'Services' && (
        <>
          <Stack.Screen name="ServicesScreen" component={ServicesScreen} />
          <Stack.Screen name="CreateAdScreen" component={CreateAdScreen} />
          <Stack.Screen name="ReportAdScreen" component={ReportAdScreen} />
          <Stack.Screen name="AdDetailsScreen" component={AdDetailsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AdStack;
