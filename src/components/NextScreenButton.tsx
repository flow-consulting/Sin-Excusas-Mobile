// src/components/NextScreenButton.tsx
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

type NextScreenButtonProps = {
  nextScreen: string;
  buttonText: string;
};

const NextScreenButton: React.FC<NextScreenButtonProps> = ({
  nextScreen,
  buttonText,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(nextScreen)}>
      <Text>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default NextScreenButton;
