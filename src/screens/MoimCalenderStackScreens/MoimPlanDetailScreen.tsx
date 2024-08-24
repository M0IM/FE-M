import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import {Typography} from 'components/@common/Typography/Typography.tsx';
import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';
import DetailSchedules from 'components/space/DetailSchedules/DetailSchedules.tsx';
import {TitleSubTitleBox} from 'components/screens/MoimPlanDetailScreen/TitleSubTitleBox.tsx';
import ParticipantList from 'components/screens/MoimPlanDetailScreen/ParticipantList.tsx';
import {queryClient} from 'containers/TanstackQueryContainer.tsx';
import PopoverMenu from 'components/@common/Popover/PopoverMenu/PopoverMenu.tsx';

import {
  MoimPlanStackNavigationProp,
  MoimPlanStackRouteProp,
} from 'navigators/types';
import useGetDetailMoimCalendar from 'hooks/queries/MoimPlanDetailScreen/useGetDetailMoimCalendar.ts';
import usePostMoimScheduleParticipation from 'hooks/queries/MoimPlanDetailScreen/usePostMoimScheduleParticipation.ts';
import useDeleteMoimScheduleParticipation from 'hooks/queries/MoimPlanDetailScreen/useDeleteMoimScheduleParticipation.ts';
import useMoimCalendarStore from 'stores/useMoimCalendarStore.ts';
import useDeleteDetailMoimCalendar from '../../hooks/queries/MoimPlanDetailScreen/useDeleteDetailMoimCalendar.ts';

interface IMoimPlanDetailScreenProps {
  route: MoimPlanStackRouteProp;
  navigation: MoimPlanStackNavigationProp;
}

export default function MoimPlanDetailScreen({
  route,
  navigation,
}: IMoimPlanDetailScreenProps) {
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);
  const moimId = route.params.id as number;
  const planId = route.params.planId as number;

  const {data, isPending, isError} = useGetDetailMoimCalendar({
    moimId,
    planId,
  });
  const {mutate: deletePost} = useDeleteDetailMoimCalendar();
  const {mutate: participationSchedule} = usePostMoimScheduleParticipation();
  const {mutate: cancelSchedule} = useDeleteMoimScheduleParticipation();
  const {setMoimCalendar, setIsEditMode} = useMoimCalendarStore();

  if (isPending || isError) {
    return <></>;
  }

  const PostMyMenuList = [
    {
      title: '수정하기',
      onPress: () => {
        setIsEditMode(true);
        setMoimCalendar({...data, planId});
        navigation.navigate('MOIM_PLAN_WRITE', {id: moimId});
      },
    },
    {
      title: '삭제하기',
      onPress: () => {
        deletePost(
          {moimId, planId},
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ['detailCalendar', moimId, planId],
              });
              queryClient.invalidateQueries({
                queryKey: ['participantList', moimId, planId],
              });
              navigation.goBack();
            },
          },
        );
      },
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-5">
        <View className="flex-row items-center justify-between">
          <Typography className="text-lg mb-3" fontWeight={'BOLD'}>
            {data?.title}
          </Typography>
          <PopoverMenu
            menu={PostMyMenuList}
            isPopover={isPopOverOpen}
            onPress={() => setIsPopOverOpen(prev => !prev)}>
            <TouchableOpacity
              className="relative"
              onPress={() => setIsPopOverOpen(prev => !prev)}>
              <Ionicons name="ellipsis-vertical" size={20} color={'#C9CCD1'} />
            </TouchableOpacity>
          </PopoverMenu>
        </View>
        <TitleSubTitleBox title={'날짜'} subTitle={data?.date} />
        <TitleSubTitleBox title={'장소'} subTitle={data?.location} />
        <TitleSubTitleBox
          title={'세부 장소'}
          subTitle={data?.locationDetail ?? '세부 장소가 없습니다.'}
        />
        <TitleSubTitleBox
          title={'시작 시간'}
          subTitle={moment(data?.date).format('A h시 m분 s초')}
        />
        <TitleSubTitleBox title={'비용'} subTitle={`${data?.cost} 원`} />
        <TitleSubTitleBox
          title={'신청 인원'}
          subTitle={`${data?.participant} 명`}
        />
        <View className="border-b-gray-100 border-b-4 my-5" />
        <Typography className="text-lg mb-3" fontWeight={'BOLD'}>
          일정 스케줄
        </Typography>
        <DetailSchedules detailSchedules={data?.schedules} />
        <View className="border-b-gray-100 border-b-4 my-5" />
        <ParticipantList moimId={moimId} planId={planId} />
        <View className="absolute right-0 left-0 bottom-3 m-5 flex-row items-center justify-center gap-y-2">
          <CustomButton
            label={
              data?.isParticipant ? '일정 참여 취소하기' : '일정 참여 신청하기'
            }
            className={data?.isParticipant ? 'bg-error' : 'bg-main'}
            textStyle="font-bold text-white text-lg"
            onPress={() => {
              data?.isParticipant
                ? cancelSchedule(
                    {moimId, planId},
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries({
                          queryKey: ['detailCalendar', moimId, planId],
                        });
                        queryClient.invalidateQueries({
                          queryKey: ['participantList', moimId, planId],
                        });
                      },
                    },
                  )
                : participationSchedule(
                    {moimId, planId},
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries({
                          queryKey: ['detailCalendar', moimId, planId],
                        });
                        queryClient.invalidateQueries({
                          queryKey: ['participantList', moimId, planId],
                        });
                      },
                    },
                  );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
