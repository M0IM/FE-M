import React, {ReactNode} from 'react';
import {Pressable, Text, PressableProps, View} from 'react-native';

type CustomButtonVariant = 'filled' | 'outlined';
type CustomButtonSize = 'large' | 'medium';

interface CustomButtonProps extends PressableProps {
  label: string;
  variant?: CustomButtonVariant;
  size?: CustomButtonSize;
  inValid?: boolean;
  textStyle?: string;
  icon?: ReactNode;
}

const filled = 'bg-main active:bg-hover';
const outlined = 'bg-white active:bg-hover';
const large = `w-full flex-row items-center justify-center h-14`;
const medium = `w-1/2 flex-row items-center justify-center h-14`;

const buttonVariant: Record<CustomButtonVariant, string> = {
  filled,
  outlined,
};

const buttonSize: Record<CustomButtonSize, string> = {
  large,
  medium,
};

export const CustomButton = ({
  label,
  variant = 'filled',
  size = 'large',
  inValid = false,
  textStyle,
  className,
  icon = null,
  ...props
}: CustomButtonProps) => (
  <Pressable
    {...props}
    disabled={inValid}
    className={`rounded-2xl ${className} 
      ${buttonSize[size]} 
      ${buttonVariant[variant]} 
      ${inValid && 'bg-gray-200'} 
      ${variant === 'outlined' && 'border-0.5 p-2 rounded-full'}`}>
    <View className={`flex flex-row items-center justify-center`}>
      {icon}
      <Text
        className={`${textStyle} ${variant === 'outlined' && 'text-gray-500'}`}>
        {label}
      </Text>
    </View>
  </Pressable>
);
