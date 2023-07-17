// src/screens/Ad/AdDetailsScreen.tsx
// src/screens/Shared/AdDetailScreen.tsx
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {AxiosManager} from '../../services/AxiosManager';

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

      // Create an instance of AxiosManager
      const axiosManager = new AxiosManager();

      // Get the ad details from the database
      const data = await axiosManager.get('ads', adId);

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
