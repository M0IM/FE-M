import {SafeAreaView} from 'react-native';
import {RouteProp} from '@react-navigation/native';

import {HomeStackParamList} from 'navigators/types';
import useGetDetailIndividualSchedule from 'hooks/queries/MoimStack/useGetDetailIndividualSchedule.ts';

interface ICalendarIndividualDetailScreenProps {
  route: RouteProp<HomeStackParamList, 'CALENDAR_INDIVIDUAL_DETAIL'>;
}

export default function CalendarIndividualDetailScreen({
  route,
}: ICalendarIndividualDetailScreenProps) {
  const {id} = route.params;
  const {data, isPending, isError} = useGetDetailIndividualSchedule(id);

  return <SafeAreaView></SafeAreaView>;
}
