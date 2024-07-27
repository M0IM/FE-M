import { View, Text, TouchableOpacity, TouchableOpacityProps, Image } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ThumbnailBoxProps extends TouchableOpacityProps {
    thumbnail: string;
    spaceImg?: string;
    spaceName: string;
}

const ThumbnailBox = ({
  thumbnail,
  spaceImg,
  spaceName,
  ...props
}: ThumbnailBoxProps) => {
  return (
    <TouchableOpacity
      {...props}
      className='relative'
      activeOpacity={0.8}
    >
      <Image source={{uri: thumbnail}} width={250} height={400} className='rounded-2xl'/>
      <View className='absolute top-0 left-0 w-[250] h-[400] bg-black opacity-60 rounded-2xl'/>
      <TouchableOpacity className='absolute flex flex-row items-center bottom-4 w-[250] h-[50]' activeOpacity={0.8}>
        {spaceImg ? (
          <Image source={{uri: spaceImg}} width={40} height={40} className='ml-3 mr-3 rounded-full'/>
        ) : (
          <View className='flex flex-col ml-2 mr-3 justify-center items-center w-[40] h-[40] rounded-full bg-gray-100'>
            <Ionicons name='home' color='#E9ECEF' size={23} />
          </View>
        )}
        <View className='w-[170]'>
          <Text className='text-white' numberOfLines={1}>{spaceName}</Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ThumbnailBox;