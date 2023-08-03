// src/components/CustomActivityIndicator.tsx
import React from 'react';
import {ActivityIndicator, ActivityIndicatorProps, View} from 'react-native';
import {useColors} from '../hooks/useColors';
import {customActivityIndicatorStyles} from '../styles/styles';

export const CustomActivityIndicator: React.FC<ActivityIndicatorProps> = ({
  ...props
}) => {
  const {palette} = useColors();

  return (
    <View style={customActivityIndicatorStyles.container}>
      <ActivityIndicator color={palette.primary[2]} {...props} />
    </View>
  );
};
