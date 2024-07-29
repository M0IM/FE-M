import { View, TouchableOpacity, Image, TouchableOpacityProps } from 'react-native';
import React from 'react';
import { Typography } from 'components/@common/Typography/Typography';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface MySpaceCardProps extends TouchableOpacityProps {
  children?: React.ReactNode;
  spaceName?: string;
  spaceImg?: string;
  description: string;
  category: string;
  region: string;
  memberCount: number;
}

const MySpaceCard = ({
  children,
  spaceName,
  spaceImg,
  description,
  category,
  region,
  memberCount,
  ...props
}: MySpaceCardProps) => {
  return (
    <TouchableOpacity
      {...props}
      className='flex flex-row items-center rounded-3xl border-2 p-6 border-gray-100'
    >
      {spaceImg ? <Image source={{uri: spaceImg}} width={60} height={60} className='rounded-lg mr-4'/>
        : (
          <View className='flex items-center justify-center rounded-lg p-4 w-[60] h-[60] bg-gray-100 mr-4'>
            <Ionicons name='home' color='#E9ECEF' size={30} />
          </View>
        )}
      <View className='flex flex-col'>
        <Typography fontWeight='BOLD' className='max-w-[200]' numberOfLines={1}>{spaceName}</Typography>
        <Typography fontWeight='MEDIUM' className='w-[200] text-gray-500 text-xs mt-2' numberOfLines={2}>{description}</Typography>
        <View className='flex flex-row mt-2'>
          <Typography fontWeight='BOLD' className='text-gray-500 text-xs'>{category}</Typography>
          <Typography fontWeight='LIGHT' className='text-gray-500 text-xs ml-2'>{region}</Typography>
          <Typography fontWeight='LIGHT' className='text-gray-500 text-xs ml-2'>참여 인원 {memberCount}</Typography>
        </View>
      </View>
      <View className='ml-auto'>
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default MySpaceCard;