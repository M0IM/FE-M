import {SafeAreaView} from 'react-native';

import {Typography} from 'components/@common/Typography/Typography.tsx';

import useGetDetailMoimParticipantSchedule from 'hooks/queries/MoimStack/useGetDetailMoimParticipantSchedule.ts';
import {HomeStackRouteProp} from 'navigators/types';

export default function CalendarParticipantDetailScreen({
  route,
}: {
  route: HomeStackRouteProp;
}) {
  const planId = route.params?.id as number;
  const {data, isPending, isError} =
    useGetDetailMoimParticipantSchedule(planId);
  return (
    <SafeAreaView>
      <Typography fontWeight={'BOLD'}>Participant</Typography>
    </SafeAreaView>
  );
}
