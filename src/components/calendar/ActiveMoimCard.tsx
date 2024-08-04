import {Image, Pressable, PressableProps, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {Typography} from '../@common/Typography/Typography.tsx';
import {useNavigation} from '@react-navigation/native';
import {MoimStackNavigationProp} from '../../navigators/types';

interface IActiveMoimCardProps extends PressableProps {
  id: string;
  spaceImg?: string;
  title: string;
  subTitle: string;
  region: string;
  category: string;
  memberCount: number;
}

export function ActiveMoimCard({
  id,
  spaceImg,
  title,
  subTitle,
  category,
  region,
  memberCount,
  ...props
}: IActiveMoimCardProps) {
  const navigation = useNavigation<MoimStackNavigationProp>();
  return (
    <Pressable
      {...props}
      onPress={() =>
        navigation.navigate('MOIM_DETAIL', {
          id: Number(id),
        })
      }
      className="flex flex-row p-[6] h-[102] items-center active:bg-hover active:rounded-lg">
      {spaceImg ? (
        <Image
          source={{uri: spaceImg}}
          width={55}
          height={55}
          className="rounded-lg"
        />
      ) : (
        <View className="flex flex-col items-center justify-center bg-gray-100 w-[55] h-[55] rounded-lg">
          <Ionicons name="home" size={20} color="#E9ECEF" />
        </View>
      )}
      <View className="flex flex-col ml-3 gap-y-0.5">
        <Typography
          fontWeight="BOLD"
          className="text-dark-800 text-base w-[300]"
          numberOfLines={1}>
          {title}
        </Typography>
        <Typography
          fontWeight="BOLD"
          className="text-gray-400 text-xs w-[300]"
          numberOfLines={1}>
          {subTitle}
        </Typography>
        <View className="flex flex-row gap-2">
          <Typography fontWeight="LIGHT" className="text-gray-500 text-xs">
            {category}
          </Typography>
          <Typography
            fontWeight="LIGHT"
            className="text-gray-500 text-xs"
            numberOfLines={1}>
            {region}
          </Typography>
          <Typography fontWeight="LIGHT" className="text-gray-500 text-xs">
            참여 인원 {memberCount}명
          </Typography>
        </View>
      </View>
    </Pressable>
  );
}
