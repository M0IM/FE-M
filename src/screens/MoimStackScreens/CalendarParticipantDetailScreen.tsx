import {RouteProp} from '@react-navigation/native';
import moment from 'moment/moment';
import 'moment/locale/ko';
import {SafeAreaView, View} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';

import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import {DetailItem} from './components/DetailItem.tsx';

import useGetDetailMoimParticipantSchedule from 'hooks/queries/MoimStack/useGetDetailMoimParticipantSchedule.ts';
import {HomeStackParamList} from 'navigators/types';

interface ICalendarParticipantDetailScreenProps {
  route: RouteProp<HomeStackParamList, 'CALENDAR_PARTICIPANT_DETAIL'>;
}

export default function CalendarParticipantDetailScreen({
  route,
}: ICalendarParticipantDetailScreenProps) {
  const {id} = route.params;
  const {data, isPending, isError, error} =
    useGetDetailMoimParticipantSchedule(id);

  if (isPending || isError) {
    return (
      <SafeAreaView>
        <Typography fontWeight={'BOLD'}>
          {error?.response?.data.message}
        </Typography>
      </SafeAreaView>
    );
  }

  return (
    <ScreenContainer>
      <DetailItem iconName="calendar" title="모임 일정" content={data?.title} />
      <DetailItem
        iconName="calendar"
        title="날짜"
        content={moment(data?.time).format('YYYY년 M월 D일')}
      />
      <DetailItem
        iconName="clock"
        title="일정 시작"
        content={moment(data?.time).format('a hh시 mm분')}
      />
      <DetailItem iconName="location" title="주소" content={data?.location} />
      <DetailItem
        iconName="location"
        title="상세 주소"
        content={data?.locationDetail}
      />
      <DetailItem
        iconName="person"
        title="현재 신청자 수"
        content={`${data?.participant} 명`}
      />
      <DetailItem
        iconType="IonIcons"
        iconName="wallet"
        title="금액"
        content={`${data?.cost} 원`}
      />
      <View className="mt-3">
        <View className="flex-row items-center gap-x-3 mb-3">
          <IonIcons name="calendar" size={24} color="#00F0A1" />
          <Typography
            className="text-gray-500 text-sm ml-2"
            fontWeight={'BOLD'}>
            세부 일정
          </Typography>
        </View>
      </View>
      {data?.schedules.map(({startTime, title}, idx) => {
        console.log(startTime);
        return (
          <View
            key={idx}
            className="flex-col items-start border p-4 border-gray-200 rounded-xl">
            <Typography className="text-gray-400" fontWeight={'BOLD'}>
              {moment(startTime, 'HH:mm:ss').format('A h시 mm분')}
            </Typography>
            <Typography className="text-black mt-3" fontWeight={'LIGHT'}>
              {title}
            </Typography>
          </View>
        );
      })}
    </ScreenContainer>
  );
}
