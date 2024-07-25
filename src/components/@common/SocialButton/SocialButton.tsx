import {Image, Pressable, PressableProps} from 'react-native';
import {cva} from 'class-variance-authority';
import {cn} from 'utils/cn';
import React from 'react';

import appleImage from 'assets/images/apple-image.png';
import googleImage from 'assets/images/google-image.png';
import kakaoImage from 'assets/images/kakao-image.png';
import naverImage from 'assets/images/naver-image.png';

interface SocialButtonProps extends PressableProps {
  provider: 'KAKAO' | 'NAVER' | 'GOOGLE' | 'APPLE';
  size?: 'SM' | 'MD' | 'LG';
  onPress?: () => void;
}

const images = {
  KAKAO: kakaoImage,
  NAVER: naverImage,
  GOOGLE: googleImage,
  APPLE: appleImage,
};

export const SocialButton = ({
  provider,
  size,
  className,
  onPress,
  ...props
}: SocialButtonProps) => (
  <Pressable
    {...props}
    className={cn(socialButtonVariants({size, provider}), className)}
    onPress={onPress}>
    <Image className="w-full h-full rounded-full" source={images[provider]} />
  </Pressable>
);

const socialButtonVariants = cva(
  'h-10 w-10 p-1 rounded-full flex items-center justify-center',
  {
    variants: {
      size: {
        SM: 'w-10 h-10',
        MD: 'w-14 h-14 p-3',
        LG: 'w-20 h-20 p-4',
      },
      provider: {
        NAVER: 'bg-social-naver active:bg-hover',
        GOOGLE: 'bg-social-google active:bg-hover',
        APPLE: 'bg-social-apple active:bg-hover',
        KAKAO: 'bg-social-kakao active:bg-hover',
      },
      defaultVariants: {
        size: 'MD',
        provider: 'GOOGLE',
      },
    },
  },
);
