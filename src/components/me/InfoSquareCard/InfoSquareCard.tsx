import {Platform, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import React from 'react';
import {Typography} from 'components/@common/Typography/Typography';
import {cva} from 'class-variance-authority';
import {cn} from 'utils';

interface InfoSquareCardProps extends TouchableOpacityProps {
  children?: React.ReactNode;
  title?: string;
}

const InfoSquareCard = ({children, title, ...props}: InfoSquareCardProps) => {
  const platform = Platform.OS;
  return (
    <TouchableOpacity
      {...props}
      className={cn(InfoSquareCardVariants({platform}))}>
      {children}
      <Typography
        fontWeight="MEDIUM"
        className="mt-2 text-xs text-gray-400"
        numberOfLines={1}>
        {title}
      </Typography>
    </TouchableOpacity>
  );
};

const InfoSquareCardVariants = cva(
  'flex flex-col items-center justify-center p-5 bg-white w-[100] h-[100] rounded-3xl',
  {
    variants: {
      platform: {
        ios: 'shadow-md shadow-gray-200',
        android: 'elevation-lg',
        windows: 'shadow-md shadow-gray-200',
        macos: 'shadow-md shadow-gray-200',
        web: 'shadow-md shadow-gray-200',
      },
    },
    defaultVariants: {
      platform: 'ios',
    },
  },
);

export default InfoSquareCard;
