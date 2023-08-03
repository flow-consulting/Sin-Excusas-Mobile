// src/components/CustomFormRow.tsx
import React from 'react';
import {View} from 'react-native';
import {useColors} from '../hooks/useColors';
import {CustomButton} from './CustomButton';
import {CustomInput} from './CustomInput';
import {CustomText} from './CustomText';

interface CustomFormRowProps {
  title: string;
  value: string;
  onChangeText: (text: string) => void;
  buttonTitle?: string;
  onButtonPress?: () => void;
  buttonType?: 'primary' | 'secondary';
}

export const CustomFormRow: React.FC<CustomFormRowProps> = ({
  title,
  value,
  onChangeText,
  buttonTitle,
  onButtonPress,
  buttonType = 'primary',
}) => {
  const {palette} = useColors();

  return (
    <View>
      <CustomText type="normal">{title}</CustomText>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CustomInput
          style={{flex: 1}}
          value={value}
          onChangeText={onChangeText}
        />
        {buttonTitle && onButtonPress && (
          <CustomButton
            type={buttonType}
            title={buttonTitle}
            onPress={onButtonPress}
          />
        )}
      </View>
    </View>
  );
};
