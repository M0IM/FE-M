import {SafeAreaView} from 'react-native';
import {RouteProp} from '@react-navigation/native';

import {Typography} from 'components/@common/Typography/Typography.tsx';

import useGetDetailMoimParticipantSchedule from 'hooks/queries/MoimStack/useGetDetailMoimParticipantSchedule.ts';
import {HomeStackParamList} from 'navigators/types';

interface ICalendarParticipantDetailScreenProps {
  route: RouteProp<HomeStackParamList, 'CALENDAR_PARTICIPANT_DETAIL'>;
}

export default function CalendarParticipantDetailScreen({
  route,
}: ICalendarParticipantDetailScreenProps) {
  console.log(route);
  const {id} = route.params;
  const {data, isPending, isError} = useGetDetailMoimParticipantSchedule(id);

  return (
    <SafeAreaView>
      <Typography fontWeight={'BOLD'}>Participant</Typography>
    </SafeAreaView>
  );
}
