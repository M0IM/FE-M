import {FlatList, TouchableOpacity, View} from 'react-native';

import {Typography} from '../../@common/Typography/Typography.tsx';
import ScheduleCard from '../../home/SchduleCard/ScheduleCard.tsx';

import {useGetUserSchedulesCount} from 'hooks/queries/FeedHome/useGetUserSchedulesCount.ts';
import {useGetUserTodaySchedules} from 'hooks/queries/FeedHome/useGetUserTodaySchedules.ts';
import {useGetUserTodayParticipantSchedules} from 'hooks/queries/FeedHome/useGetUserTodayParticipantSchedules.ts';
import {useGetInfiniteAllUserScheduleList} from '../../../hooks/queries/FeedHome/useGetInfiniteAllUserSchedule.ts';

export default function MoimScheduleEvent() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const {data: profile, isPending: isProfilePending} = useGetUserSchedulesCount(
    {year, month, day},
  );
  const {
    data: calendars,
    isPending: calendarsLoading,
    isError: calendarsError,
  } = useGetInfiniteAllUserScheduleList(year, month, day, 8);

  console.log(calendars.pages.flatMap(calendar => calendar.userPlanDTOList));

  if (calendarsLoading || calendarsError) {
    return <View></View>;
  }

  return (
    <View className="flex flex-col gap-2 mt-1">
      <Typography className="text-2xl mt-5" fontWeight={'BOLD'}>
        {isProfilePending ? '안녕하세요' : `${profile?.nickname}님`}
      </Typography>
      <TouchableOpacity>
        <Typography
          className="text-gray-400 border-b-gray-300 border-b-2 mb-3"
          fontWeight={'LIGHT'}>
          오늘 {profile?.dailyPlanCnt ?? 0}개의 예정된 일정이 있어요
        </Typography>
      </TouchableOpacity>
      <FlatList
        data={calendars.pages.flatMap(calendar => calendar.userPlanDTOList)}
        horizontal={true}
        renderItem={({item}) => {
          return <ScheduleCard item={item} />;
        }}
        keyExtractor={item => String(item.planId)}
        contentContainerStyle={{
          gap: 10,
        }}
      />
    </View>
  );
}
