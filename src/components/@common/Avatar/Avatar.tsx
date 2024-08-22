import {Image, ImageProps, TouchableOpacity} from 'react-native';
import React from 'react';
import {cva} from 'class-variance-authority';
import {cn} from 'utils';
import user from '../../../assets/icons/user.png';

enum SIZE {
  XS = 24,
  SM = 40,
  MD = 50,
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
  className,
  onPress,
  ...props
}: AvatarProps) => {
  console.log(SIZE.XS);
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={uri ? {uri: uri} : user}
        className={cn(avatarVariants({size}), className)}
        style={!uri ? {width: SIZE[size], height: SIZE[size]} : {}}
        {...props}
      />
    </TouchableOpacity>
  );
};

const avatarVariants = cva(
  'flex flex-col items-center justify-center rounded-full',
  {
    variants: {
      size: {
        XS: `w-[${SIZE.XS}px] h-[${SIZE.XS}px]`,
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
