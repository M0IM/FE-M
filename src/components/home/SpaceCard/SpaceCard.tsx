import { View, Text, TouchableOpacityProps, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface SpaceCardProps extends TouchableOpacityProps {
    uri?: string;
    spaceName: string;
}

const SpaceCard = ({
  uri,
  spaceName,
  ...props
}: SpaceCardProps) => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      className='flex flex-col items-center gap-3 w-[160]'
    >
      {uri ? <Image source={{uri: uri}} width={140} height={120} className='rounded-[30px]' /> :
        (
          <View className='flex flex-col justify-center items-center w-[140] h-[120] rounded-[20px] bg-gray-100'>
            <Ionicons name='home' color='#E9ECEF' size={50} />
          </View>
        )
      }
      <Text className='text-dark-800' numberOfLines={1}>{spaceName}</Text>
    </TouchableOpacity>
  );
};

export default SpaceCard;