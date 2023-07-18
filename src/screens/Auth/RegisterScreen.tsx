import React, {useState} from 'react';
import {Button, StyleSheet, Switch, Text, TextInput, View} from 'react-native';
import {useAuth} from '../../hooks/useAuth';

const RegisterScreen = () => {
  const [fullName, setFullName] = useState('');
  const [whatsAppNumber, setWhatsAppNumber] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const {register} = useAuth();

  const handleRegister = async () => {
    // Call the register function from the useAuth hook
    await register(fullName, whatsAppNumber, isAdmin);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Full Name:</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />
      <Text style={styles.label}>WhatsApp Number:</Text>
      <TextInput
        style={styles.input}
        value={whatsAppNumber}
        onChangeText={setWhatsAppNumber}
        keyboardType="phone-pad"
      />
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Is Admin:</Text>
        <Switch value={isAdmin} onValueChange={setIsAdmin} />
      </View>
      <Button title="Register" onPress={handleRegister} />
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default RegisterScreen;
