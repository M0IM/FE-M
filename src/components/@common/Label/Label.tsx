import { View } from 'react-native';
import React from 'react';
import { Typography } from '../Typography/Typography';

enum COLOR {
  MAIN = 'main',
  GRAY = 'gray-300',
  DARK = 'black'
}

type LabelVariant = 'filled' | 'outlined';
type LabelColor = 'main' | 'gray' | 'dark';

interface LabelProps {
  color?: LabelColor;
  variant?: LabelVariant;
  label: string;
  style?: string;
}

const Label = ({
  color = 'dark',
  variant = 'outlined',
  label,
  style,
}: LabelProps) => {
  const hexColors = {
    main: '#00F0A1',
    gray: '#C9CCD1',
    dark: '#000000'
  };
  const hexColor = hexColors[color];

  const nameColors = {
    main: COLOR.MAIN,
    gray: COLOR.GRAY,
    dark: COLOR.DARK
  };
  const nameColor = nameColors[color];
  
  return (
    <View className={`flex flex-col items-center justify-center p-1 pl-2 pr-2 rounded-2xl
        ${variant === 'filled' && `bg-${nameColor}`}
        ${variant === 'outlined' && `border-[1px]`}
        ${style}
    `}
      style={variant === 'outlined' && {borderColor: hexColor}}
    >
      <Typography 
        fontWeight={variant === 'filled' ? 'BOLD' : 'MEDIUM'}
        className={`${variant === 'outlined' ? `text-${nameColor}` : 'text-white'} text-xs `}
      >{label}</Typography>
    </View>
  );
};

export default Label;
