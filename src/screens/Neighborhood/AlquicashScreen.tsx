// src/screens/Neighborhood/AlquicashScreen.tsx
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  CustomButton,
  CustomFlatList,
  CustomText,
  CustomView,
} from '../../components';
import {useAsyncStorage} from '../../hooks/useAsyncStorage';
import useDatabaseData from '../../hooks/useDatabaseData';

const AlquicashScreen = () => {
  const [ads, setAds] = useState([]);
  const navigation = useNavigation();
  const {getItem: getAsyncStorageItem} = useAsyncStorage();
  const {query: queryAds} = useDatabaseData('ads');

  const fetchAds = useCallback(async () => {
    // Get the user data from local storage
    const userData = await getAsyncStorageItem('user');
    if (userData) {
      const user = JSON.parse(userData);

      // Get Alquicash ads for the selected neighborhood from the database
      const data = await queryAds({
        type: 'Alquicash',
        neighborhoodId: user.neighborhoodId,
      });

      // Log the value of data to the console
      console.log('AlquicashScreen fetchAds data:', data);

      // Update state with the fetched ads
      setAds(data);
    }
  }, [getAsyncStorageItem, queryAds]);

  useFocusEffect(
    useCallback(() => {
      fetchAds();
    }, [fetchAds]),
  );

  const handleCreateAd = () => {
    // Navigate to the CreateAdScreen
    navigation.navigate('CreateAdScreen', {adType: 'Alquicash'});
  };

  const handleSelectAd = (ad: any) => {
    console.log('AlquicashScreen handleSelectAd ad:', ad);
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

export default AlquicashScreen;
