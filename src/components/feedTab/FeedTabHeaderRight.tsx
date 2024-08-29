import {Pressable, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {HomeStackNavigationProp} from '../../navigators/types';
import {useEffect, useState} from 'react';
import axiosInstance from '../../apis/axiosInstance.ts';
import {Typography} from '../@common/Typography/Typography.tsx';
import useGetAlertCount from '../../hooks/queries/PushAlertScreen/useGetAlertCount.ts';

export function FeedTabHeaderRight(navigation: HomeStackNavigationProp) {
  const {data} = useGetAlertCount();

  return (
    <View className="flex flex-row items-center justify-center">
      <Pressable className="active:bg-hover p-1 rounded-2xl mr-3">
        <Ionicons
          name="search"
          size={24}
          color="#1D2002"
          onPress={() => navigation.navigate('MOIM_SEARCH')}
        />
      </Pressable>
      <Pressable
        className="active:bg-hover p-1 rounded-2xl mr-3 relative"
        onPress={() => navigation.navigate('PUSH_ALERT')}>
        <Ionicons name="notifications-outline" size={24} color="#1D2002" />
      </Pressable>
      {data?.remainAlarms !== 0 ? (
        <View className="font-bold absolute flex-col items-center justify-center -top-1 left-[58px] rounded-full bg-error w-4 h-4">
          <Typography className="text-white" fontWeight={'BOLD'}>
            N
          </Typography>
        </View>
      ) : null}
    </View>
  );
}
