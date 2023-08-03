// src/components/CustomPicker.tsx
import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {useColors} from '../hooks/useColors';

interface CustomPickerProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: {label: string; value: string}[];
  placeholder?: string;
}

export const CustomPicker: React.FC<CustomPickerProps> = ({
  selectedValue,
  onValueChange,
  items,
  placeholder,
}) => {
  const {palette} = useColors();

  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={{color: palette.neutral[4]}}>
      {placeholder && (
        <Picker.Item label={placeholder} value="" color={palette.neutral[2]} />
      )}
      {items.map(item => (
        <Picker.Item
          key={item.value}
          label={item.label}
          value={item.value}
          color={palette.neutral[4]}
        />
      ))}
    </Picker>
  );
};
