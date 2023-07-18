// src/screens/Shared/ServicesScreen.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useAuth} from '../../hooks/useAuth';
import dbManager from '../../interfaces/DatabaseManager';

const ServicesScreen = () => {
  const [ads, setAds] = useState([]);
  const navigation = useNavigation();
  const {user} = useAuth();
  const userId = user?.id;

  const fetchAds = useCallback(async () => {
    // Get all ads from the database
    const data = await dbManager.getAll('ads');

    // Get the ID of the selected friend group from AsyncStorage
    const friendGroupId = await AsyncStorage.getItem('selectedFriendGroupId');

    // Filter ads based on the provided parameters
    const filteredAds = data.filter(
      ad =>
        (!userId || ad.userId === userId) &&
        (!friendGroupId || ad.friendGroupId === friendGroupId),
    );

    // Update state with the filtered ads
    setAds(filteredAds);
  }, [userId]);

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
