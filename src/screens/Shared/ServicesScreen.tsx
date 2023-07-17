// src/screens/Shared/ServicesScreen.tsx
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {AxiosManager} from '../../services/AxiosManager';

const ServicesScreen = () => {
  const [ads, setAds] = useState([]);
  const navigation = useNavigation();

  const fetchAds = useCallback(async () => {
    // Create an instance of AxiosManager
    const axiosManager = new AxiosManager();

    // Get all ads from the database
    const data = await axiosManager.getAll('ads');

    // Update state with the fetched ads
    setAds(data);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAds();
    }, [fetchAds]),
  );

  return (
    <View>
      <Text>Services</Text>
      <FlatList
        data={ads}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AdDetailsScreen', {adId: item.id})
            }>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity onPress={() => navigation.navigate('CreateAdScreen')}>
        <Text>Create Ad</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ServicesScreen;
