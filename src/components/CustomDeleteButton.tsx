// src/components/CustomDeleteButton.tsx
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useColors} from '../hooks/useColors';
import {customDeleteButtonStyles} from '../styles/styles';

interface CustomDeleteButtonProps {
  onPress: () => void;
}

export const CustomDeleteButton: React.FC<CustomDeleteButtonProps> = ({
  onPress,
}) => {
  const {palette} = useColors();

  return (
    <TouchableOpacity
      style={[
        customDeleteButtonStyles.button,
        {backgroundColor: palette.error},
      ]}
      onPress={onPress}>
      <Text style={{color: palette.white}}>X</Text>
    </TouchableOpacity>
  );
};
