import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import dbManager from './src/services/DatabaseManager'; // Make sure to use the correct path to the file

const App = () => {
  const handleCreateTestDocument = async () => {
    try {
      const id = await dbManager.add('yourCollection', {
        // Add the fields you want for your test document here
        field1: 'value1',
        field2: 'value2',
      });
      console.log(`Document created with ID: ${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>emptyspace</Text>
      <TouchableOpacity onPress={handleCreateTestDocument}>
        <Text>Create Test Document</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
