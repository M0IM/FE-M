import {FlatList, View} from 'react-native';

import {Typography} from '../../@common/Typography/Typography.tsx';
import ScheduleCard from '../../home/SchduleCard/ScheduleCard.tsx';
import {useGetMyProfile} from '../../../hooks/queries/MyScreen/useGetProfile.ts';
import {useGetPersonalCalendar} from '../../../hooks/queries/CalendarHomeScreen/useGetPersonalCalendar.ts';
import {useState} from 'react';

export default function MoimScheduleEvent() {
  const {data: profile, isPending: isProfilePending} = useGetMyProfile();
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const {
    data: calendars,
    isPending,
    isError,
  } = useGetPersonalCalendar({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  if (isPending || isError) {
    return <View></View>;
  }

  // TODO: 백엔드한테, 개인일정과, 모임에 신청한 내 일정등을 다 보여주는 API 받기
  const todayScehdules = calendars[selectedDate];

  return (
    <View className="flex flex-col gap-2 mt-1">
      <Typography className="text-2xl mt-5" fontWeight={'BOLD'}>
        {isProfilePending ? '안녕하세요' : `${profile?.result.nickname}님`}
      </Typography>
      <Typography className="text-gray-400 mb-4" fontWeight={'LIGHT'}>
        오늘 {todayScehdules?.length ?? 0}개의 예정된 일정이 있어요
      </Typography>
      <FlatList
        data={todayScehdules}
        horizontal={true}
        renderItem={({item}) => (
          <ScheduleCard
            schedule={item.schedule}
            date={item.date}
            spaceName={item.spaceName}
            time={item.time}
          />
        )}
        keyExtractor={schedule => String(schedule.id)}
        contentContainerStyle={{
          gap: 10,
        }}
      />
    </View>
  );
}
