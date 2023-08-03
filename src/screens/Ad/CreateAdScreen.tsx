// src/screens/Ad/CreateAdScreen.tsx
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  CustomButton,
  CustomFormRow,
  CustomImagePicker,
  CustomPickerInputRow,
  CustomView,
} from '../../components';
import {useAsyncStorage} from '../../hooks/useAsyncStorage';
import useDatabaseData from '../../hooks/useDatabaseData';

const CreateAdScreen = () => {
  const [price, setPrice] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [period, setPeriod] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [images, setImages] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const {adType, context} = route.params;
  const {getItem: getAsyncStorageItem} = useAsyncStorage();
  const {add: addAd} = useDatabaseData('ads');

  const handleSaveAd = useCallback(async () => {
    const userData = await getAsyncStorageItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      const friendGroupId = await getAsyncStorageItem('selectedFriendGroupId');
      const newAd = {
        type: adType,
        active: true,
        date: new Date().toISOString(),
        price: Number(price),
        title,
        publisherId: user.id,
        clickedUserIds: [],
        photos: images,
        mainPhotoIndex: 0,
        description,
        period,
        category: category === 'Otro' ? customCategory : category,
        ...(adType === 'Vendotodo' || adType === 'Alquicash'
          ? {neighborhoodId: user.neighborhoodId}
          : context === 'neighborhood'
          ? {neighborhoodId: user.neighborhoodId}
          : {friendGroupId}),
      };
      await addAd(newAd);
      navigation.goBack();
    }
  }, [
    adType,
    addAd,
    context,
    description,
    getAsyncStorageItem,
    images,
    navigation,
    price,
    title,
    period,
    category,
    customCategory,
  ]);

  return (
    <CustomView type="scrollView">
      <CustomFormRow title="Title:" value={title} onChangeText={setTitle} />
      <CustomFormRow
        title="Description:"
        value={description}
        onChangeText={setDescription}
      />
      {adType === 'Alquicash' && (
        <>
          <CustomFormRow
            title="Price:"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          <CustomPickerInputRow
            title="Period:"
            value={period}
            onChangeText={setPeriod}
            items={[
              {label: 'Days', value: 'Days'},
              {label: 'Months', value: 'Months'},
              {label: 'Hours', value: 'Hours'},
            ]}
          />
          <CustomPickerInputRow
            title="Category:"
            value={category === 'Otro' ? customCategory : category}
            onChangeText={category === 'Otro' ? setCustomCategory : () => {}}
            items={[
              {label: 'Room', value: 'Room'},
              {label: 'Vehicle', value: 'Vehicle'},
              {label: 'Motorcycle', value: 'Motorcycle'},
              {label: 'Other', value: 'Other'},
            ]}
            onValueChange={value => {
              setCategory(value);
              if (value !== 'Other') {
                setCustomCategory('');
              }
            }}
          />
          {category === 'Other' && (
            <CustomFormRow
              title="Custom Category:"
              value={customCategory}
              onChangeText={setCustomCategory}
            />
          )}
        </>
      )}
      <CustomImagePicker images={images} setImages={setImages} />
      <CustomButton type="primary" title="Save Ad" onPress={handleSaveAd} />
    </CustomView>
  );
};

export default CreateAdScreen;
