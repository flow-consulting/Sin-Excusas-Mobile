// src/screens/Ad/AdDetailsScreen.tsx
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import dbManager from '../../interfaces/DatabaseManager';

type AdDetailRouteProp = RouteProp<
  {AdDetailsScreen: {adId: string}},
  'AdDetailsScreen'
>;

const AdDetailScreen = () => {
  const [ad, setAd] = useState(null);
  const route = useRoute<AdDetailRouteProp>();

  useEffect(() => {
    const fetchAd = async () => {
      // Get the ad ID from the route params
      const adId = route.params.adId;

      // Get the ad details from the database
      const data = await dbManager.get('ads', 'id', adId);

      // Update state with the fetched ad details
      setAd(data);
    };

    fetchAd();
  }, [route.params.adId]);

  if (!ad) {
    return null;
  }

  return (
    <View>
      <Text>{ad.title}</Text>
      <Text>{ad.description}</Text>
      {/* ... other ad details ... */}
    </View>
  );
};

export default AdDetailScreen;
