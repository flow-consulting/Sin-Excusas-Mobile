import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useAuth} from '../../hooks/useAuth';

const LoginScreen = () => {
  const [whatsAppNumber, setWhatsAppNumber] = useState('');
  const [error, setError] = useState('');
  const {login} = useAuth();

  const handleLogin = async () => {
    // Call the login function from the useAuth hook
    const user = await login(whatsAppNumber);

    // Check if the user was logged in successfully
    if (!user) {
      // Show an error message if the login failed
      setError('Invalid WhatsApp number');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>WhatsApp Number:</Text>
      <TextInput
        style={styles.input}
        value={whatsAppNumber}
        onChangeText={setWhatsAppNumber}
        keyboardType="phone-pad"
      />
      <Button title="Login" onPress={handleLogin} />
      {error && <Text>{error}</Text>}
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

export default LoginScreen;
