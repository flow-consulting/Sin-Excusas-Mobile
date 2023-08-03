// src/hooks/useColors.ts
import { useEffect, useState } from 'react';
import tinycolor from 'tinycolor2';
import { DEFAULT_PRIMARY_COLOR } from '../constants/constants';
import { useAsyncStorage } from './useAsyncStorage';

type Color = string;

interface TriadicPalette {
  primary: Color[];
  secondary: Color[];
  tertiary: Color[];
  neutral: Color[];
  error: Color;
  success: Color;
  info: Color;
  warning: Color;
  white: Color;
  black: Color;
}

interface AnalogousPalette {
  primary: Color[];
  secondary: Color[];
  tertiary: Color[];
  neutral: Color[];
  error: Color;
  success: Color;
  info: Color;
  warning: Color;
  white: Color;
  black: Color;
}

const generateTriadicPalette = (primaryColor: Color): TriadicPalette => {
  // console.log(
  //   'useStyles.ts - generateTriadicPalette - primaryColor:',
  //   primaryColor,
  // );

  const primary = tinycolor(primaryColor);
  const secondary = primary.clone().spin(120);
  const tertiary = primary.clone().spin(240);
  const neutral = tinycolor('#808080');

  const generateColorVariations = (color: tinycolor.Instance): Color[] => [
    color.clone().lighten(20).toHexString(),
    color.clone().lighten(10).toHexString(),
    color.toHexString(),
    color.clone().darken(10).toHexString(),
    color.clone().darken(20).toHexString(),
  ];

  return {
    primary: generateColorVariations(primary),
    secondary: generateColorVariations(secondary),
    tertiary: generateColorVariations(tertiary),
    neutral: generateColorVariations(neutral),
    error: '#8B0000',
    success: '#556B2F',
    info: '#4682B4',
    warning: '#DAA520',
    white: '#FFFFFF',
    black: '#000000',
  };
};

const generateAnalogousPalette = (primaryColor: Color): AnalogousPalette => {
  const primary = tinycolor(primaryColor);
  const secondary = primary.clone().spin(30);
  const tertiary = primary.clone().spin(-30);
  const neutral = tinycolor('#808080');

  const generateColorVariations = (color: tinycolor.Instance): Color[] => [
    color.clone().lighten(20).toHexString(),
    color.clone().lighten(10).toHexString(),
    color.toHexString(),
    color.clone().darken(10).toHexString(),
    color.clone().darken(20).toHexString(),
  ];

  return {
    primary: generateColorVariations(primary),
    secondary: generateColorVariations(secondary),
    tertiary: generateColorVariations(tertiary),
    neutral: generateColorVariations(neutral),
    error: '#8B0000',
    success: '#556B2F',
    info: '#4682B4',
    warning: '#DAA520',
    white: '#FFFFFF',
    black: '#000000',
  };
};
export const useColors = () => {
  const [color, setColor] = useState(DEFAULT_PRIMARY_COLOR);
  const [palette, setPalette] = useState<AnalogousPalette>({
    primary: [],
    secondary: [],
    tertiary: [],
    neutral: [],
    error: '#8B0000',
    success: '#556B2F',
    info: '#4682B4',
    warning: '#DAA520',
    white: '#FFFFFF',
    black: '#000000',
  });

  // Use the useAsyncStorage hook to get the getItem function
  const {getItem} = useAsyncStorage();

  useEffect(() => {
    const getColorFromAsyncStorage = async () => {
      // Get the neighborhood color from AsyncStorage using the getItem function from the useAsyncStorage hook
      const neighborhoodColor = await getItem('neighborhoodColor');

      // Log the value of neighborhoodColor
      // console.log(
      //   'useStyles.ts - getColorFromAsyncStorage - neighborhoodColor:',
      //   neighborhoodColor,
      // );

      // If there is a neighborhood color stored in AsyncStorage, use it as the primary color
      if (neighborhoodColor) {
        setColor(neighborhoodColor);
      }
    };

    getColorFromAsyncStorage();
  }, []);

  useEffect(() => {
    setPalette(generateAnalogousPalette(color));
  }, [color]);

  // console.log('useStyles.ts - useStyles - palette:', palette);

  return {palette, setPrimaryColor: setColor};
};
