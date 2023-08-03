// src/screens/Neighborhood/NeighborhoodScreen.tsx
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {CustomButton} from '../../components/CustomButton';
import {CustomText} from '../../components/CustomText';
import {CustomView} from '../../components/CustomView';
import {useAsyncStorage} from '../../hooks/useAsyncStorage';

const NeighborhoodScreen = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigation = useNavigation();
  const {getItem: getAsyncStorageItem} = useAsyncStorage();

  useEffect(() => {
    const init = async () => {
      const userData = await getAsyncStorageItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setIsAdmin(user.isAdmin);
      }
    };
    init();
  }, []);

  return (
    <CustomView type="screen">
      <CustomText type="normal">NeighborhoodScreen</CustomText>
      {isAdmin && (
        <CustomButton
          type="primary"
          title="Create New Neighborhood"
          onPress={() => navigation.navigate('CreateNeighborhoodScreen')}
        />
      )}
    </CustomView>
  );
};

export default NeighborhoodScreen;
