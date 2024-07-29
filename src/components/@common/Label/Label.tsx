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
}

const Label = ({
  color = 'dark',
  variant = 'outlined',
  label
}: LabelProps) => {
  const hexColors = {
    main: '#00F0A1',
    gray:'#72787F',
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
        ${variant === 'outlined' && `border-[${hexColor}] border-[1px]`}
    `}>
      <Typography 
        fontWeight={variant === 'filled' ? 'BOLD' : 'MEDIUM'}
        className={`${variant === 'outlined' ? `text-${nameColor}` : 'text-white'} text-xs `}
      >{label}</Typography>
    </View>
  );
};

export default Label;
