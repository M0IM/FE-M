import {Image, Pressable, PressableProps} from 'react-native';
import {cva} from 'class-variance-authority';
import {cn} from 'utils/cn';
import React from 'react';

import LogoTransparent from 'assets/logos/logo-green.png';
import LogoBackground from 'assets/logos/logo-icon.png';

interface SocialButtonProps extends PressableProps {
  size?: 'SM' | 'MD' | 'LG';
  background: 'TRANSPARENT' | 'BACKGROUND';
  onPress?: () => void;
}

const images = {
  TRANSPARENT: LogoTransparent,
  BACKGROUND: LogoBackground,
};

export const Logo = ({
  size,
  background,
  className,
  onPress,
  ...props
}: SocialButtonProps) => (
  <Pressable
    {...props}
    className={cn(socialButtonVariants({size}), className)}
    onPress={onPress}>
    <Image
      className="w-full h-full"
      source={images[background]}
      resizeMode="contain"
    />
  </Pressable>
);

const socialButtonVariants = cva(
  'w-24 h-24 active:bg-hover flex items-center justify-center',
  {
    variants: {
      size: {
        SM: 'w-10 h-10',
        MD: 'w-14 h-14',
        LG: 'w-20 h-20',
      },
      defaultVariants: {
        size: 'MD',
        background: 'BACKGROUND',
      },
    },
  },
);
