// src/components/CustomPickerInputRow.tsx
import React, {useState} from 'react';
import {View} from 'react-native';
import {useColors} from '../hooks/useColors';
import {CustomButton} from './CustomButton';
import {CustomInput} from './CustomInput';
import {CustomPicker} from './CustomPicker';
import {CustomText} from './CustomText';

interface CustomPickerInputRowProps {
  title: string;
  value: string;
  onChangeText: (text: string) => void;
  items: {label: string; value: string}[];
  onValueChange?: (value: string) => void;
}

export const CustomPickerInputRow: React.FC<CustomPickerInputRowProps> = ({
  title,
  value,
  onChangeText,
  items,
  onValueChange,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const {palette} = useColors();

  const handleValueChange = (value: string) => {
    onChangeText(value);
    setShowPicker(false);
    onValueChange?.(value);
  };

  return (
    <View>
      <CustomText type="normal">{title}</CustomText>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CustomInput
          style={{flex: 1}}
          value={value}
          onChangeText={onChangeText}
          editable={false}
        />
        <CustomButton
          type="secondary"
          title="Select"
          onPress={() => setShowPicker(!showPicker)}
        />
      </View>
      {showPicker && (
        <CustomPicker
          selectedValue={value}
          onValueChange={handleValueChange}
          items={items}
        />
      )}
    </View>
  );
};
