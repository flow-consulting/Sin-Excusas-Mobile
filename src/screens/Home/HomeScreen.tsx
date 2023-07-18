// HomeScreen.tsx
import React from 'react';
import {Text, View} from 'react-native';
import {useNeighborhood} from '../../hooks/useNeighborhood';

const HomeScreen = () => {
  const {neighborhoodId} = useNeighborhood();
  console.log('HomeScreen neighborhoodId:', neighborhoodId);

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
