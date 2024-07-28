import { View, Image, Pressable } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PressableProps } from 'react-native';
import { Typography } from 'components/@common/Typography/Typography';

interface SpacePreviewCardProps extends PressableProps {
    spaceImg?: string;
    spaceName: string;
    region: string;
    memberCount: number;
}

const SpacePreviewCard = ({
  spaceImg,
  spaceName,
  region,
  memberCount,
  ...props
}: SpacePreviewCardProps) => {
  return (
    <Pressable
      {...props}
      className='flex flex-row p-[6] items-center active:bg-gray-50 active:rounded-lg'
    >
      {spaceImg ? <Image source={{uri: spaceImg}} width={50} height={50} className='rounded-lg'/>
        : (
          <View className='flex flex-col items-center justify-center bg-gray-100 w-[50] h-[50] rounded-lg'>
            <Ionicons name='home' size={20} color='#E9ECEF' />
          </View>
        )}
      <View className='flex flex-col gap-1 ml-3'>
        <Typography fontWeight='BOLD' className='text-dark-800 text-base w-[300]' numberOfLines={1}>{spaceName}</Typography>
        <View className='flex flex-row items-center'>
          <Typography fontWeight='LIGHT' className='text-gray-500 text-xs'>멤버 {memberCount}명</Typography>
          <Typography fontWeight='LIGHT' className='text-gray-500 ml-3 text-xs w-[150]' numberOfLines={1}>{region}</Typography>
        </View>
      </View>
    </Pressable>
  );
};

export default SpacePreviewCard;