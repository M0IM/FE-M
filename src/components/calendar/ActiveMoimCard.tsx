import {Image, Pressable, PressableProps, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Typography} from '../@common/Typography/Typography.tsx';

import {HomeStackNavigationProp} from 'navigators/types';
import {TMoimDTOResponse} from 'types/dtos/moim.ts';

interface IActiveMoimCardProps extends PressableProps {
  moim: TMoimDTOResponse;
  navigation: HomeStackNavigationProp;
}

export function ActiveMoimCard({
  moim,
  navigation,
  ...props
}: IActiveMoimCardProps) {
  console.log(moim);
  return (
    <Pressable
      {...props}
      onPress={() =>
        navigation.navigate('MOIM_STACK', {
          screen: 'MOIM_SPACE',
          params: {
            id: moim?.moimId,
          },
        })
      }
      className="flex flex-row p-[6] h-[102] items-center active:bg-hover active:rounded-lg">
      {moim?.profileImageUrl ? (
        <Image
          source={{uri: moim.profileImageUrl}}
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
          {moim?.title}
        </Typography>
        <Typography
          fontWeight="BOLD"
          className="text-gray-400 text-xs w-[300]"
          numberOfLines={1}>
          {moim?.description}
        </Typography>
        <View className="flex flex-row gap-2">
          <Typography fontWeight="LIGHT" className="text-gray-500 text-xs">
            {moim?.category}
          </Typography>
          <Typography
            fontWeight="LIGHT"
            className="text-gray-500 text-xs"
            numberOfLines={1}>
            {moim?.address}
          </Typography>
          <Typography fontWeight="LIGHT" className="text-gray-500 text-xs">
            참여 인원 {moim?.memberCount}명
          </Typography>
        </View>
      </View>
    </Pressable>
  );
}
