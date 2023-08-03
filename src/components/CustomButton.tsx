// src/components/CustomButton.tsx
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useColors} from '../hooks/useColors';
import {customButtonStyles} from '../styles/styles';

interface CustomButtonProps {
  type: 'primary' | 'secondary';
  title: string;
  onPress: () => void;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  type,
  title,
  onPress,
}) => {
  const {palette} = useColors();

  console.log(
    'CustomButton.tsx',
    'CustomButton',
    'type',
    type,
    'title',
    title,
    'onPress',
    onPress,
  );

  const buttonStyles = [
    customButtonStyles.button,
    {
      backgroundColor:
        type === 'primary' ? palette.primary[2] : palette.secondary[2],
    },
  ];

  const handlePress = () => {
    console.log('CustomButton.tsx', 'handlePress', 'title', title);
    onPress();
  };

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={handlePress}
      onPressIn={() => console.log('CustomButton.tsx', 'onPressIn', title)}
      onPressOut={() => console.log('CustomButton.tsx', 'onPressOut', title)}
      onLongPress={() => console.log('CustomButton.tsx', 'onLongPress', title)}
      delayPressIn={0}>
      <Text style={[customButtonStyles.text, {color: palette.neutral[4]}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
