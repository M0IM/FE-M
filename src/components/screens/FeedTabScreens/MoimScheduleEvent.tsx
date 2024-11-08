import {FlatList, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

import {Typography} from '../../@common/Typography/Typography.tsx';
import ScheduleCard from '../../home/SchduleCard/ScheduleCard.tsx';

import {useGetUserSchedulesCount} from 'hooks/queries/FeedHome/useGetUserSchedulesCount.ts';
import {useGetInfiniteAllUserScheduleList} from 'hooks/queries/FeedHome/useGetInfiniteAllUserSchedule.ts';
import {HomeStackNavigationProp} from 'navigators/types';
import MoimScheduleEventSkeleton from './skeleton/MoimScheduleEventSkeleton.tsx';
import {TUserPlanDTO} from 'types/dtos/calendar.ts';
import ScheduleColorPalette from './ScheduleColorPalette.tsx';

interface MoimScheduleEventProps {
  isRefreshing: boolean;
}

export default function MoimScheduleEvent({
  isRefreshing,
}: MoimScheduleEventProps) {
  const navigation = useNavigation<HomeStackNavigationProp>();
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const {
    data: profile,
    isPending: isProfilePending,
    refetch: refetchUserSchedules,
  } = useGetUserSchedulesCount({year, month, day});
  const {
    data: calendars,
    isPending: calendarsLoading,
    isError: calendarsError,
    refetch: refetchAllUserSchedules,
  } = useGetInfiniteAllUserScheduleList(year, month, day, 8);
  useEffect(() => {
    const refetch = async () => {
      if (isRefreshing) {
        await refetchUserSchedules();
        await refetchAllUserSchedules();
      }
    };
    refetch();
  }, [isRefreshing]);

  if (isProfilePending || calendarsLoading) {
    return (
      <View className="flex flex-col gap-2 mt-1">
        <MoimScheduleEventSkeleton />
      </View>
    );
  }

  if (calendarsError) {
    return (
      <View className="flex-col items-center justify-center h-[300]">
        <Typography fontWeight={'BOLD'}>에러가 발생했습니다.</Typography>
      </View>
    );
  }

  const renderScheduleCard = ({item}: {item: TUserPlanDTO}) => (
    <ScheduleCard
      item={item}
      onPress={() => {
        switch (item.planType) {
          case 'MOIM_PLAN':
            navigation.navigate('CALENDAR_PARTICIPANT_DETAIL', {
              id: item.planId,
            });
            break;
          case 'INDIVIDUAL_PLAN':
            navigation.navigate('CALENDAR_INDIVIDUAL_DETAIL', {
              id: item.planId,
            });
            break;
          default:
            navigation.navigate('CALENDAR_TODO_DETAIL', {
              moimId: item.moimId,
              id: item.planId,
            });
            break;
        }
      }}
    />
  );

  return (
    <View className="flex flex-col gap-y-2 mt-1">
      <Typography
        numberOfLines={1}
        className="text-2xl mt-5"
        fontWeight={'BOLD'}>
        {isProfilePending ? '안녕하세요' : `반가워요, ${profile?.nickname}님`}
      </Typography>
      <View className="flex flex-row">
        <Typography
          numberOfLines={1}
          className="text-gray-400 mb-3"
          fontWeight={'LIGHT'}>
          오늘 {profile?.dailyPlanCnt ?? 0}개의 예정된 일정이 있어요
        </Typography>
      </View>
      <FlatList
        data={calendars.pages.flatMap(calendar => calendar.userPlanDTOList)}
        horizontal={true}
        renderItem={renderScheduleCard}
        keyExtractor={item => String(item.planId)}
        contentContainerStyle={{
          gap: 10,
        }}
      />
      <View className="py-1">
        <ScheduleColorPalette />
      </View>
    </View>
  );
}
