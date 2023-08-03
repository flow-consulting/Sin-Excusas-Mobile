// src/components/CustomAlert.tsx
import {Alert} from 'react-native';

interface CustomAlertProps {
  title: string;
  message: string;
  onPressOk: () => void;
}

export const CustomAlert = ({title, message, onPressOk}: CustomAlertProps) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'OK',
        onPress: onPressOk,
      },
    ],
    {cancelable: false},
  );
};
