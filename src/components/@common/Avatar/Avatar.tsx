import {ImageProps, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import user from '../../../assets/icons/user.png';

interface AvatarProps extends ImageProps {
  uri?: string;
  size?: 'XS' | 'SM' | 'MD' | 'LG';
  onPress?: () => void;
  disabled?: boolean;
}

const Avatar = ({
  uri,
  size = 'SM',
  className,
  onPress,
  disabled = false,
}: AvatarProps) => {
  const [avatarSize, setAvatarSize] = useState<string>('');

  const avatarStyle = (): string => {
    if (size === 'XS') {
      return 'w-7 h-7';
    } else if (size === 'SM') {
      return 'w-9 h-9';
    } else if (size === 'MD') {
      return 'w-12 h-12';
    } else if (size === 'LG') {
      return 'w-20 h-20';
    } else {
      return 'w-7 h-7';
    }
  };

  useEffect(() => {
    const size = avatarStyle();
    setAvatarSize(size);
  }, []);

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <FastImage
        source={uri ? {uri: uri} : user}
        className={`flex flex-col items-center justify-center rounded-full ${avatarSize} ${className}`}
        resizeMode={FastImage.resizeMode.cover}
      />
    </TouchableOpacity>
  );
};

export default Avatar;
