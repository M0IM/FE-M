import {ImageProps, TouchableOpacity} from 'react-native';
import React from 'react';
import {cva} from 'class-variance-authority';
import {cn} from 'utils';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';

enum SIZE {
  XS = 25,
  SM = 40,
  MD = 60,
  LG = 100,
}

interface AvatarProps extends ImageProps {
  uri?: string;
  size?: 'XS' | 'SM' | 'MD' | 'LG';
  iconColor?: string;
  onPress?: () => void;
}

const Avatar = ({
  uri,
  size = 'SM',
  iconColor = '#E9ECEF',
  className,
  onPress,
  ...props
}: AvatarProps) => {
  const iconSizes = {
    XS: SIZE.XS,
    SM: SIZE.SM,
    MD: SIZE.MD,
    LG: SIZE.LG,
  };

  const userIconSize = iconSizes[size] || iconSizes.SM;

  return (
    <TouchableOpacity onPress={onPress}>
      {uri ? (
        <FastImage
          source={{uri: uri}}
          className={cn(avatarVariants({size}), className)}
          resizeMode={FastImage.resizeMode.cover}
        />
      ) : (
        <Ionicon name="person-circle" size={userIconSize} color={iconColor} />
      )}
    </TouchableOpacity>
  );
};

const avatarVariants = cva(
  'flex flex-col items-center justify-center bg-gray-100 rounded-full',
  {
    variants: {
      size: {
        XS: `w-[${SIZE.XS}] h-[${SIZE.XS}]`,
        SM: `w-[${SIZE.SM}] h-[${SIZE.SM}]`,
        MD: `w-[${SIZE.MD}] h-[${SIZE.MD}]`,
        LG: `w-[${SIZE.LG}] h-[${SIZE.LG}]`,
      },
      defaultVariants: {
        size: 'SM',
      },
    },
  },
);

export default Avatar;
