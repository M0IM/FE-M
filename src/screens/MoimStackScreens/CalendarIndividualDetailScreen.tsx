import {View} from 'react-native';
import moment from 'moment';
import {RouteProp} from '@react-navigation/native';

import {ScreenContainer} from 'components/ScreenContainer';
import {DetailItem} from './components/DetailItem.tsx';

import {HomeStackParamList} from 'navigators/types';
import useGetDetailIndividualSchedule from 'hooks/queries/MoimStack/useGetDetailIndividualSchedule';

interface ICalendarIndividualDetailScreenProps {
  route: RouteProp<HomeStackParamList, 'CALENDAR_INDIVIDUAL_DETAIL'>;
}

export default function CalendarIndividualDetailScreen({
  route,
}: ICalendarIndividualDetailScreenProps) {
  const {id} = route.params;
  const {data, isPending, isError} = useGetDetailIndividualSchedule(id);

  const formattedDate = data?.time
    ? moment(data.time).format('YYYY년 M월 D일')
    : '';

  const formattedTime = data?.time
    ? moment(data.time)
        .format('A h시 mm분')
        .replace('AM', '오전')
        .replace('PM', '오후')
    : '';

  if (isPending || isError) {
    return <View></View>;
  }

  return (
    <ScreenContainer>
      <DetailItem iconName="calendar" title="개인 일정" content={data?.title} />
      <DetailItem iconName="calendar" title="날짜" content={formattedDate} />
      <DetailItem iconName="clock" title="시작 시간" content={formattedTime} />
      <DetailItem iconName="location" title="주소" content={data?.location} />
      <DetailItem
        iconName="location"
        title="상세 주소"
        content={data?.locationDetail}
      />
      <DetailItem
        isMemo={true}
        iconName="note"
        title="메모"
        content={data?.memo}
      />
    </ScreenContainer>
  );
}
