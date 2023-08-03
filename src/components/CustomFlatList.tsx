// src/components/CustomFlatList.tsx
import React from 'react';
import {FlatList, FlatListProps, TouchableOpacity} from 'react-native';
import {useColors} from '../hooks/useColors';
import {customFlatListStyles} from '../styles/styles';

interface CustomFlatListProps<ItemT> extends FlatListProps<ItemT> {
  type?: 'adListItem' | 'friendGroupListItem';
  onPressItem: (item: ItemT) => void;
}

export const CustomFlatList = <ItemT extends any>({
  type,
  onPressItem,
  ...props
}: CustomFlatListProps<ItemT>) => {
  const {palette} = useColors();

  const renderItem = ({item}: {item: ItemT}) => (
    <TouchableOpacity
      style={[
        customFlatListStyles.item,
        type === 'adListItem' && [
          customFlatListStyles.adListItem,
          {backgroundColor: palette.neutral[0]},
        ],
        type === 'friendGroupListItem' && [
          customFlatListStyles.friendGroupListItem,
          {backgroundColor: palette.neutral[0]},
        ],
      ]}
      onPress={() => onPressItem(item)}>
      {props.renderItem && props.renderItem({item})}
    </TouchableOpacity>
  );

  return <FlatList {...props} renderItem={renderItem} />;
};
