import {TouchableOpacity, View} from 'react-native';

import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';
import SchedulePreviewCard from 'components/space/SchedulePreviewCard/SchedulePreviewCard.tsx';
import DetailSchedules from 'components/space/DetailSchedules/DetailSchedules.tsx';
import Avatar from 'components/@common/Avatar/Avatar.tsx';

import {MoimPlanStackRouteProp} from 'navigators/types';
import useGetDetailMoimCalendar from 'hooks/queries/MoimPlanHomeScreen/useGetDetailMoimCalendar.ts';

interface IMoimPlanDetailScreenProps {
  route: MoimPlanStackRouteProp;
}

export const participantsData = [
  {
    userId: 1,
    email: 'user1@example.com',
    nickname: 'User1',
    profileImg:
      'https://images.unsplash.com/photo-1722543510591-9ae8d3f49b9b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0M3x8fGVufDB8fHx8fA%3D%3D',
  },
  {
    userId: 2,
    email: 'user2@example.com',
    nickname: 'User2',
    profileImg:
      'https://plus.unsplash.com/premium_photo-1721852724565-cdea2e9a471a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NXx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    userId: 3,
    email: 'user3@example.com',
    nickname: 'User3',
    profileImg:
      'https://plus.unsplash.com/premium_photo-1694475533648-23161460762a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1NXx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    userId: 4,
    email: 'user4@example.com',
    nickname: 'User4',
    profileImg:
      'https://images.unsplash.com/photo-1722543510591-9ae8d3f49b9b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0M3x8fGVufDB8fHx8fA%3D%3D',
  },
  {
    userId: 5,
    email: 'user5@example.com',
    nickname: 'User5',
    profileImg:
      'https://images.unsplash.com/photo-1722543510591-9ae8d3f49b9b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0M3x8fGVufDB8fHx8fA%3D%3D',
  },
];
export const detailSchedules = [
  {
    startTime: '09:00 AM',
    title: 'Team Standup Meeting',
  },
  {
    startTime: '10:30 AM',
    title: 'Project Planning Session',
  },
  {
    startTime: '12:00 PM',
    title: 'Lunch Break',
  },
  {
    startTime: '01:00 PM',
    title: 'Client Presentation',
  },
  {
    startTime: '03:00 PM',
    title: 'Code Review',
  },
  {
    startTime: '04:30 PM',
    title: 'Development Workshop',
  },
  {
    startTime: '06:00 PM',
    title: 'End of Day Wrap-up',
  },
];

export default function MoimPlanDetailScreen({
  route,
}: IMoimPlanDetailScreenProps) {
  const planId = route.params.id as number;

  const {data, isPending, isError} = useGetDetailMoimCalendar({
    moimId: 1,
    planId,
  });

  console.log(data);

  if (isPending || isError) {
    return <></>;
  }

  return (
    <ScreenContainer>
      <View className="flex flex-col items-center justify-center mb-4">
        <SchedulePreviewCard
          title="매주 월요일 정기 스터디"
          date="2024년 07월 24일  오후 5 : 30"
          place="상명대학교 G208"
          cost={0}
          participants={participantsData}
        />
      </View>
      <DetailSchedules detailSchedules={detailSchedules} />
      <Typography className="mt-3" fontWeight={'BOLD'}>
        신청자 (4)
      </Typography>
      <View className="flex-col gap-y-3">
        {[
          {id: 1, name: '김용민'},
          {id: 2, name: '안예원'},
          {id: 3, name: '차다인'},
          {id: 4, name: '김준환'},
        ].map((item, i) => (
          <TouchableOpacity key={i} className="flex-row items-center w-full">
            <Avatar size={'MD'} />
            <Typography className="ml-3" fontWeight={'BOLD'}>
              {item.name}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>
      <View className="p-3 pt-0">
        <CustomButton
          label="가입하기"
          textStyle="font-bold text-white text-base"
        />
      </View>
    </ScreenContainer>
  );
}
