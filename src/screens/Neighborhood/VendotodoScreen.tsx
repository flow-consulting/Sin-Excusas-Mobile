// src/screens/Neighborhood/VendotodoScreen.tsx
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNeighborhood} from '../../hooks/useNeighborhood';
import dbManager from '../../interfaces/DatabaseManager';

const VendotodoScreen = () => {
  const [ads, setAds] = useState([]);
  const {neighborhoodId} = useNeighborhood();
  const navigation = useNavigation();

  const fetchAds = useCallback(async () => {
    // Get all ads from the database
    const data = await dbManager.getAll('ads');

    // Filter ads to show only Vendotodo ads for the selected neighborhood
    const filteredAds = data.filter(
      ad => ad.type === 'Vendotodo' && ad.neighborhoodId === neighborhoodId,
    );

    // Update state with the filtered ads
    setAds(filteredAds);
  }, [neighborhoodId]);

  useFocusEffect(
    useCallback(() => {
      fetchAds();
    }, [fetchAds]),
  );

  const handleCreateAd = () => {
    // Navigate to the CreateAdScreen
    navigation.navigate('CreateAdScreen', {adType: 'Vendotodo'});
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={ads}
        renderItem={({item}) => (
          <TouchableOpacity>
            <Text style={styles.adTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.createButton} onPress={handleCreateAd}>
        <Text style={styles.createButtonText}>Create new ad</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  adTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  createButton: {
    backgroundColor: '#4da6ff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VendotodoScreen;
