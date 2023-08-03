// src/components/CustomView.tsx
import React from 'react';
import {ScrollView, View, ViewProps} from 'react-native';
import {useColors} from '../hooks/useColors';
import {customViewStyles} from '../styles/styles';

interface CustomViewProps extends ViewProps {
  type?:
    | 'screen'
    | 'flatList'
    | 'adListItem'
    | 'friendGroupListItem'
    | 'scrollView';
}

export const CustomView: React.FC<CustomViewProps> = ({
  type,
  style,
  children,
  ...props
}) => {
  const {palette} = useColors();

  const viewStyles = [
    customViewStyles.view,
    type === 'screen' && {backgroundColor: palette.neutral[0]},
    type === 'flatList' && {backgroundColor: palette.neutral[1]},
    type === 'adListItem' && [
      customViewStyles.adListItem,
      {backgroundColor: palette.neutral[0]},
    ],
    type === 'friendGroupListItem' && [
      customViewStyles.friendGroupListItem,
      {backgroundColor: palette.neutral[0]},
    ],
    style,
  ];

  if (type === 'scrollView') {
    return (
      <ScrollView style={viewStyles} {...props}>
        {children}
      </ScrollView>
    );
  } else {
    return (
      <View style={viewStyles} {...props}>
        {children}
      </View>
    );
  }
};
