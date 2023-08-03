// src/screens/Auth/LoginScreen.tsx
import React, {useState} from 'react';
import {CustomButton, CustomFormRow, CustomView} from '../../components';
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
    <CustomView type="screen">
      <CustomFormRow
        title="WhatsApp Number:"
        value={whatsAppNumber}
        onChangeText={setWhatsAppNumber}
      />
      <CustomButton type="primary" title="Login" onPress={handleLogin} />
      {error && <CustomText type="normal">{error}</CustomText>}
    </CustomView>
  );
};

export default LoginScreen;
