// src/navigation/Ad/AdStack.tsx
import {useRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {CustomActivityIndicator} from '../../components';
import {useAsyncStorage} from '../../hooks/useAsyncStorage';
import AdDetailsScreen from '../../screens/Ad/AdDetailsScreen';
import CreateAdScreen from '../../screens/Ad/CreateAdScreen';
import ReportAdScreen from '../../screens/Ad/ReportAdScreen';
import AlquicashScreen from '../../screens/Neighborhood/AlquicashScreen';
import VendotodoScreen from '../../screens/Neighborhood/VendotodoScreen';
import ServicesScreen from '../../screens/Shared/ServicesScreen';

const Stack = createStackNavigator();

const AdStack = () => {
  const [loading, setLoading] = useState(true);
  const [neighborhoodId, setNeighborhoodId] = useState<string | null>(null);
  const route = useRoute();
  const {adType, context} = route.params;
  console.log('AdStack adType:', adType);
  const {getItem: getAsyncStorageItem} = useAsyncStorage();

  useEffect(() => {
    const init = async () => {
      // Get the user data from local storage
      const userData = await getAsyncStorageItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setNeighborhoodId(user.neighborhoodId);
      }
      setLoading(false);
    };
    init();
  }, [getAsyncStorageItem]);

  console.log('AdStack neighborhoodId:', neighborhoodId);

  if (loading) {
    return <CustomActivityIndicator />;
  }

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
          <Stack.Screen
            name="ServicesScreen"
            component={ServicesScreen}
            initialParams={{context}}
          />
          <Stack.Screen name="CreateAdScreen" component={CreateAdScreen} />
          <Stack.Screen name="ReportAdScreen" component={ReportAdScreen} />
          <Stack.Screen name="AdDetailsScreen" component={AdDetailsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AdStack;
