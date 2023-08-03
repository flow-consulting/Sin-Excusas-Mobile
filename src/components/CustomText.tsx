// src/components/CustomText.tsx
import React from 'react';
import {Text, TextProps} from 'react-native';
import {useColors} from '../hooks/useColors';
import {customTextStyles} from '../styles/styles';

interface CustomTextProps extends TextProps {
  type?: 'normal' | 'title' | 'subtitle';
}

export const CustomText: React.FC<CustomTextProps> = ({
  type,
  style,
  children,
  ...props
}) => {
  const {palette} = useColors();

  const textStyles = [
    customTextStyles.text,
    {color: palette.neutral[4]},
    type === 'normal' && customTextStyles.normal,
    type === 'title' && customTextStyles.title,
    type === 'subtitle' && customTextStyles.subtitle,
    style,
  ];

  return (
    <Text style={textStyles} {...props}>
      {children}
    </Text>
  );
};
