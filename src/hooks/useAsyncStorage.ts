// src/hooks/useAsyncStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';

export const useAsyncStorage = () => {
  const getItem = useCallback(async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);

      // Log the value returned by AsyncStorage.getItem
      // console.log(
      //   'useAsyncStorage.ts - getItem -  key:',
      //   key,
      //   ' value:',
      //   value,
      // );

      return value;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const setItem = useCallback(async (key: string, value: string) => {
    try {
      // Log the name of the file, the name of the function, and the values of the key and value arguments
      // console.log('useAsyncStorage.ts - setItem - key:', key, ' value:', value);

      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const removeItem = useCallback(async (key: string) => {
    try {
      // Log the name of the file, the name of the function, and the value of the key argument
      // console.log('useAsyncStorage.ts - removeItem - key:', key);

      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return {getItem, setItem, removeItem};
};
