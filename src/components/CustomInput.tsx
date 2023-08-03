// src/components/CustomInput.tsx
import React from 'react';
import {TextInput, TextInputProps} from 'react-native';
import {useColors} from '../hooks/useColors';
import {customInputStyles} from '../styles/styles';

export const CustomInput: React.FC<TextInputProps> = ({style, ...props}) => {
  const {palette} = useColors();

  const inputStyles = [
    customInputStyles.input,
    {color: palette.neutral[4], borderColor: palette.neutral[2]},
    style,
  ];

  return <TextInput style={inputStyles} {...props} />;
};
