// src/screens/Shared/CreateAdScreen.tsx
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Button, TextInput, View} from 'react-native';
import {AxiosManager} from '../../services/AxiosManager';

const CreateAdScreen = () => {
  const [type, setType] = useState<'Alquicash' | 'Services' | 'Vendotodo'>(
    'Services',
  );
  const [price, setPrice] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();

  const handleSaveAd = async () => {
    // Create an instance of AxiosManager
    const axiosManager = new AxiosManager();

    // Create a new ad object
    const newAd = {
      type,
      active: true,
      date: new Date().toISOString(),
      price: Number(price),
      title,
      publisherId: 'TODO: Replace with actual publisher ID',
      clickedUserIds: [],
      photos: [],
      mainPhotoIndex: 0,
      description,
    };

    // Save the new ad to the database
    await axiosManager.add('ads', newAd);

    // Navigate back to the Services screen
    navigation.goBack();
  };

  return (
    <View>
      <TextInput
        value={type}
        onChangeText={setType}
        placeholder="Type (Alquicash, Services, Vendotodo)"
      />
      <TextInput value={price} onChangeText={setPrice} placeholder="Price" />
      <TextInput value={title} onChangeText={setTitle} placeholder="Title" />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
      />
      <Button title="Save Ad" onPress={handleSaveAd} />
    </View>
  );
};

export default CreateAdScreen;
