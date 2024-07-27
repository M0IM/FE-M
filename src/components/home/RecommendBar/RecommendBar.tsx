import { View, Text, TouchableOpacity, TouchableOpacityProps, Image } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface RecommendBarProps extends TouchableOpacityProps {
  profileImg?: string;
  username: string,
}

const RecommendBar = ({
  profileImg,
  username,
  ...props
}: RecommendBarProps) => (
  <TouchableOpacity
    className='flex bg-gray-100 flex-row p-5 items-center justify-center rounded-3xl'
    {...props}
  >
    {profileImg ? <Image source={{uri: profileImg}} width={35} height={35} className='rounded-full mr-3' /> : 
      <View className='mr-3'>
        <Ionicons name="person-circle" color="#E9ECEF" size={40} />
      </View>
    }
    <View className='flex flex-col justify-center'>
      <Text className='text-dark-900 text-base' numberOfLines={1}>{username}님의 관심사를 알려주세요!</Text>
      <Text className='text-gray-500 text-xs mt-[2px]' numberOfLines={1}>관심 분야를 설정하면 정확한 추천이 피드에 표시돼요.</Text>
    </View>
    <View className='ml-auto'>
      <Ionicons name='chevron-forward' color="#E9ECEF" size={30} />
    </View>
  </TouchableOpacity>
);


export default RecommendBar;