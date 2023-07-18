// src/screens/Ad/CreateAdScreen.tsx
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAuth} from '../../hooks/useAuth';
import {useNeighborhood} from '../../hooks/useNeighborhood';
import dbManager from '../../interfaces/DatabaseManager';

const CreateAdScreen = () => {
  const [price, setPrice] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const {adType} = route.params;
  const {user} = useAuth();
  const userId = user?.id;
  const {neighborhoodId} = useNeighborhood();

  // Log the value of the userId
  console.log('UserId:', userId);

  const handleSaveAd = async () => {
    // Create a new ad object
    const newAd = {
      type: adType,
      active: true,
      date: new Date().toISOString(),
      price: Number(price),
      title,
      publisherId: userId,
      clickedUserIds: [],
      photos: [],
      mainPhotoIndex: 0,
      description,
      neighborhoodId,
    };

    // Save the new ad to the database
    await dbManager.add('ads', newAd);

    // Navigate back to the Services screen
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Price:</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Price"
          keyboardType="numeric"
        />
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Title"
        />
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
          multiline
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveAd}>
          <Text style={styles.saveButtonText}>Save Ad</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#4da6ff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateAdScreen;
