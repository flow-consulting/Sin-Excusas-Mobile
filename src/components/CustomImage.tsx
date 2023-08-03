// src/components/CustomImage.tsx
import React from 'react';
import {Image, ImageProps} from 'react-native';
import {useColors} from '../hooks/useColors';

interface CustomImageProps extends ImageProps {}

export const CustomImage: React.FC<CustomImageProps> = props => {
  const {palette} = useColors();

  return <Image {...props} style={{width: 50, height: 50}} />;
};
