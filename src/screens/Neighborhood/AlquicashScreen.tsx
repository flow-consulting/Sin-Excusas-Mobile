// src/screens/Neighborhood/AlquicashScreen.tsx
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {FlatList, Text, TouchableOpacity} from 'react-native';
import {useNeighborhood} from '../../hooks/useNeighborhood';
import dbManager from '../../interfaces/DatabaseManager';

const AlquicashScreen = () => {
  const [ads, setAds] = useState([]);
  const {neighborhoodId} = useNeighborhood();

  const fetchAds = useCallback(async () => {
    // Get all ads from the database
    const data = await dbManager.getAll('ads');

    // Filter ads to show only Alquicash ads for the selected neighborhood
    const filteredAds = data.filter(
      ad => ad.type === 'Alquicash' && ad.neighborhoodId === neighborhoodId,
    );

    // Update state with the filtered ads
    setAds(filteredAds);
  }, [neighborhoodId]);

  useFocusEffect(
    useCallback(() => {
      fetchAds();
    }, [fetchAds]),
  );

  return (
    <FlatList
      data={ads}
      renderItem={({item}) => (
        <TouchableOpacity>
          <Text>{item.title}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id}
    />
  );
};

export default AlquicashScreen;
