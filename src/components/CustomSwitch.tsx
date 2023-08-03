// src/components/CustomSwitch.tsx
import React from 'react';
import {Switch, SwitchProps} from 'react-native';
import {useColors} from '../hooks/useColors';

export const CustomSwitch: React.FC<SwitchProps> = ({...props}) => {
  const {palette} = useColors();

  return (
    <Switch
      trackColor={{false: palette.neutral[2], true: palette.primary[2]}}
      thumbColor={palette.neutral[4]}
      {...props}
    />
  );
};
