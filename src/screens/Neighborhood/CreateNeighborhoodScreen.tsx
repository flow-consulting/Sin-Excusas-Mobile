// src/screens/Neighborhood/CreateNeighborhoodScreen.tsx
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useAuth} from '../../hooks/useAuth';
import {useNeighborhood} from '../../hooks/useNeighborhood';

const CreateNeighborhoodScreen = () => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#ffffff');
  const navigation = useNavigation();
  const {user} = useAuth();
  const userId = user?.id;
  const {createNeighborhood} = useNeighborhood();

  const handleSaveNeighborhood = async () => {
    // Log the values of name, userId, and color to the console
    console.log('CreateNeighborhoodScreen handleSaveNeighborhood name:', name);
    console.log(
      'CreateNeighborhoodScreen handleSaveNeighborhood userId:',
      userId,
    );
    console.log(
      'CreateNeighborhoodScreen handleSaveNeighborhood color:',
      color,
    );

    if (userId) {
      await createNeighborhood(name, userId, color);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Color:</Text>
      <TextInput style={styles.input} value={color} onChangeText={setColor} />
      <Button title="Save Neighborhood" onPress={handleSaveNeighborhood} />
    </View>
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
});

export default CreateNeighborhoodScreen;
