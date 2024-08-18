import {SafeAreaView, View} from 'react-native';

import {Typography} from 'components/@common/Typography/Typography.tsx';
import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';
import DetailSchedules from 'components/space/DetailSchedules/DetailSchedules.tsx';
import {TitleSubTitleBox} from 'components/screens/MoimPlanDetailScreen/TitleSubTitleBox.tsx';
import ParticipantList from 'components/screens/MoimPlanDetailScreen/ParticipantList.tsx';

import {MoimPlanStackRouteProp} from 'navigators/types';
import useGetDetailMoimCalendar from 'hooks/queries/MoimPlanDetailScreen/useGetDetailMoimCalendar.ts';

interface IMoimPlanDetailScreenProps {
  route: MoimPlanStackRouteProp;
}

export default function MoimPlanDetailScreen({
  route,
}: IMoimPlanDetailScreenProps) {
  const moimId = route.params.id as number;
  const planId = route.params.planId as number;

  const {data, isPending, isError} = useGetDetailMoimCalendar({
    moimId,
    planId,
  });

  if (isPending || isError) {
    return <></>;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-5">
        <Typography className="text-lg mb-3" fontWeight={'BOLD'}>
          {data?.title}
        </Typography>
        <TitleSubTitleBox title={'날짜'} subTitle={data?.date} />
        <TitleSubTitleBox title={'장소'} subTitle={data?.location} />
        <TitleSubTitleBox
          title={'세부 장소'}
          subTitle={'데이터 추가가 필요함'}
        />
        <TitleSubTitleBox title={'시작 시간'} subTitle={data?.date} />
        <TitleSubTitleBox title={'비용'} subTitle={`${data?.cost} 원`} />
        <TitleSubTitleBox title={'신청 인원'} subTitle={`${data?.cost} 명`} />
        <View className="border-b-gray-100 border-b-4 my-5" />
        <Typography className="text-lg mb-3" fontWeight={'BOLD'}>
          일정 스케줄
        </Typography>
        <DetailSchedules detailSchedules={data?.schedules} />
        <View className="border-b-gray-100 border-b-4 my-5" />
        <ParticipantList moimId={moimId} planId={planId} />
        {/* TODO: 세부일정 참여 신청 API 받아서 연결하기 */}
        <View className="absolute right-0 left-0 bottom-3 m-5 flex-row items-center justify-center gap-y-2">
          <CustomButton
            label="참여 신청하기"
            textStyle="font-bold text-white text-lg"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
