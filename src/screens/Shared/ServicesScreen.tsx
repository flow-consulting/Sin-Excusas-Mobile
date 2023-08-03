// src/screens/Shared/ServicesScreen.tsx
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  CustomButton,
  CustomFlatList,
  CustomText,
  CustomView,
} from '../../components';
import {useAsyncStorage} from '../../hooks/useAsyncStorage';
import useDatabaseData from '../../hooks/useDatabaseData';

const ServicesScreen = () => {
  const [ads, setAds] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const {context} = route.params;
  const {getItem: getAsyncStorageItem} = useAsyncStorage();
  const {query: queryAds} = useDatabaseData('ads');

  const fetchAds = useCallback(async () => {
    // Get the user data from local storage
    const userData = await getAsyncStorageItem('user');
    if (userData) {
      const user = JSON.parse(userData);

      // Get the ID of the selected friend group from AsyncStorage
      const friendGroupId = await getAsyncStorageItem('selectedFriendGroupId');

      // Log the value of the context
      console.log('ServicesScreen fetchAds context:', context);

      // Get ads from the database based on the provided parameters
      let data;
      if (context === 'neighborhood') {
        // Get Services ads for the selected neighborhood from the database
        data = await queryAds({
          type: 'Services',
          neighborhoodId: user.neighborhoodId,
        });
      } else {
        // Get Services ads for the selected friend group from the database
        data = await queryAds({
          type: 'Services',
          friendGroupId,
        });
      }

      // Log the value of the fetched ads
      console.log('ServicesScreen fetchAds data:', data);

      // Update state with the fetched ads
      setAds(data);
    }
  }, [context, getAsyncStorageItem, queryAds]);

  useFocusEffect(
    useCallback(() => {
      fetchAds();
    }, [fetchAds]),
  );

  const handleCreateAd = () => {
    // Navigate to the CreateAdScreen
    navigation.navigate('CreateAdScreen', {adType: 'Services', context});
  };

  const handleSelectAd = (ad: any) => {
    console.log('ServicesScreen handleSelectAd ad:', ad);
    // Navigate to the AdDetailScreen with the selected ad as a navigation parameter
    navigation.navigate('AdDetailsScreen', {ad});
  };

  return (
    <CustomView type="screen">
      <CustomFlatList
        type="adListItem"
        data={ads}
        renderItem={({item}) => (
          <CustomText type="normal">{item.title}</CustomText>
        )}
        keyExtractor={item => item.id}
        onPressItem={handleSelectAd}
      />
      <CustomButton
        type="primary"
        title="Create new ad"
        onPress={handleCreateAd}
      />
    </CustomView>
  );
};

export default ServicesScreen;
