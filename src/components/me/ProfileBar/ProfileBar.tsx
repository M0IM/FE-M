import { View, TouchableOpacityProps, TouchableOpacity } from 'react-native';
import React from 'react';
import Avatar from 'components/@common/Avatar/Avatar';
import { Typography } from 'components/@common/Typography/Typography';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Label from 'components/@common/Label/Label';

interface ProfileBarProps extends TouchableOpacityProps {
    uri?: string;
    username: string;
    label?: string;
}

const ProfileBar = ({
  username,
  uri,
  label,
  ...props
}: ProfileBarProps) => {
  return (
    <TouchableOpacity
      {...props}
      className='flex flex-row items-center p-3'
    >
      <Avatar uri={uri} size='MD' />
      <Typography fontWeight='BOLD' className='ml-3 mr-3 text-dark-800'>{username}</Typography>
      {label && <Label label={label} />}
      <View className='ml-auto'>
        <Ionicons name='chevron-forward' color="#E9ECEF" size={30} />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileBar;