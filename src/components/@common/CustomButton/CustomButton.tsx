import React, {ReactNode} from 'react';
import {
  Pressable,
  Text,
  PressableProps,
  View,
  ActivityIndicator,
} from 'react-native';

type CustomButtonVariant = 'filled' | 'outlined' | 'gray';
type CustomButtonSize = 'large' | 'medium';

interface CustomButtonProps extends PressableProps {
  label: string;
  variant?: CustomButtonVariant;
  size?: CustomButtonSize;
  inValid?: boolean;
  textStyle?: string;
  icon?: ReactNode;
  isLoading?: boolean;
}

const filled = 'bg-main active:bg-hover';
const outlined = 'bg-white active:bg-hover';
const gray = 'bg-gray-100 active:bg-hover';
const large = `w-full flex-row items-center justify-center h-14`;
const medium = `w-1/2 flex-row items-center justify-center h-14`;

const buttonVariant: Record<CustomButtonVariant, string> = {
  filled,
  outlined,
  gray,
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
  isLoading,
  ...props
}: CustomButtonProps) => (
  <Pressable
    {...props}
    disabled={isLoading || inValid}
    className={`rounded-2xl ${className} 
      ${buttonSize[size]} 
      ${buttonVariant[variant]} 
      ${inValid && 'bg-gray-200'} 
      ${variant === 'outlined' && 'p-2 rounded-full'}`}>
    <View className={`flex flex-row items-center justify-center`}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          {icon}
          <Text
            className={`${textStyle} ${variant === 'outlined' && 'text-gray-500'}`}>
            {label}
          </Text>
        </>
      )}
    </View>
  </Pressable>
);
