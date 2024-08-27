import {FlatList, TouchableOpacity, View} from 'react-native';
import {useEffect} from 'react';

import {Typography} from '../../@common/Typography/Typography.tsx';
import ScheduleCard from '../../home/SchduleCard/ScheduleCard.tsx';

import {useGetUserSchedulesCount} from 'hooks/queries/FeedHome/useGetUserSchedulesCount.ts';
import {useGetInfiniteAllUserScheduleList} from 'hooks/queries/FeedHome/useGetInfiniteAllUserSchedule.ts';
import {useNavigation} from '@react-navigation/native';
import {
  CalendarStackNavigationProp,
  HomeStackNavigationProp,
} from '../../../navigators/types';

interface MoimScheduleEventProps {
  isRefreshing: boolean;
}

export default function MoimScheduleEvent({
  isRefreshing,
}: MoimScheduleEventProps) {
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

  if (calendarsLoading || calendarsError) {
    return <View></View>;
  }

  const navigation = useNavigation<HomeStackNavigationProp>();

  return (
    <View className="flex flex-col gap-2 mt-1">
      <Typography className="text-2xl mt-5" fontWeight={'BOLD'}>
        {isProfilePending ? '안녕하세요' : `${profile?.nickname}님`}
      </Typography>
      <TouchableOpacity>
        <Typography className="text-gray-400 mb-3" fontWeight={'LIGHT'}>
          오늘 {profile?.dailyPlanCnt ?? 0}개의 예정된 일정이 있어요
        </Typography>
      </TouchableOpacity>
      <FlatList
        data={calendars.pages.flatMap(calendar => calendar.userPlanDTOList)}
        horizontal={true}
        renderItem={({item}) => {
          console.log(item.planType);
          console.log(item.planType);

          return (
            <ScheduleCard
              item={item}
              onPress={() => {
                item.planType === 'MOIM_PLAN'
                  ? navigation.navigate('CALENDAR_PARTICIPANT_DETAIL', {
                      id: item.planId,
                    })
                  : navigation.navigate('CALENDAR_INDIVIDUAL_DETAIL', {
                      id: item.planId,
                    });
              }}
            />
          );
        }}
        keyExtractor={item => String(item.planId)}
        contentContainerStyle={{
          gap: 10,
        }}
      />
    </View>
  );
}
