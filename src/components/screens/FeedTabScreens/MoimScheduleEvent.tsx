import {FlatList, View} from 'react-native';

import {Typography} from '../../@common/Typography/Typography.tsx';
import {schedules} from 'screens/FeedTabScreens/FeedHomeScreen.tsx';
import ScheduleCard from '../../home/SchduleCard/ScheduleCard.tsx';
import {useGetMyProfile} from '../../../hooks/queries/MyScreen/useGetProfile.ts';

export default function MoimScheduleEvent() {
  const {data: profile, isPending} = useGetMyProfile();

  return (
    <View className="flex flex-col gap-2 mt-1">
      <Typography className="text-2xl mt-5" fontWeight={'BOLD'}>
        {isPending ? '안녕하세요' : `${profile?.result.nickname}님`}
      </Typography>
      <Typography className="text-gray-400 mb-4" fontWeight={'LIGHT'}>
        오늘 3개의 예정된 일정이 있어요
      </Typography>
      <FlatList
        data={schedules}
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
