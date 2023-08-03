// src/screens/Auth/RegisterScreen.tsx
import React, {useState} from 'react';
import {
  CustomButton,
  CustomFormRow,
  CustomSwitch,
  CustomText,
  CustomView,
} from '../../components';
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
    <CustomView type="screen">
      <CustomFormRow
        title="Full Name:"
        value={fullName}
        onChangeText={setFullName}
      />
      <CustomFormRow
        title="WhatsApp Number:"
        value={whatsAppNumber}
        onChangeText={setWhatsAppNumber}
      />
      <CustomView>
        <CustomText type="normal">Is Admin:</CustomText>
        <CustomSwitch value={isAdmin} onValueChange={setIsAdmin} />
      </CustomView>
      <CustomButton type="primary" title="Register" onPress={handleRegister} />
      {error && <CustomText type="normal">{error}</CustomText>}
    </CustomView>
  );
};

export default RegisterScreen;
