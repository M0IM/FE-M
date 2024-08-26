import React, {useState} from 'react';
import {ActivityIndicator, SafeAreaView, View} from 'react-native';

import FloatingButton from 'components/@common/FloatingButton/FloatingButton.tsx';
import {PlanCalendarEventList} from 'components/@common/CalendarEventList/PlanCalendarEventList.tsx';
import {MoimCalendar} from 'components/calendar/Calendar/MoimCalendar.tsx';

import {getMonthYearDetails, getNewMonthYear} from 'utils';
import {
  MoimPlanStackNavigationProp,
  MoimPlanStackRouteProp,
} from 'navigators/types';
import {useGetMoimCalendar} from 'hooks/queries/MoimPlanHomeScreen/useGetMoimCalendar.ts';
import useMoimCalendarStore from '../../stores/useMoimCalendarStore.ts';
import {Typography} from '../../components/@common/Typography/Typography.tsx';
import useRequestMoimJoin from '../../hooks/queries/MoimSpace/useRequestMoimJoin.ts';
import {CustomButton} from '../../components/@common/CustomButton/CustomButton.tsx';
import Toast from 'react-native-toast-message';

interface IMoimPlanHomeScreenProps {
  route: MoimPlanStackRouteProp;
  navigation: MoimPlanStackNavigationProp;
}

const MoimPlanHomeScreen = ({route, navigation}: IMoimPlanHomeScreenProps) => {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState(0);
  const requestMoimJoimMutation = useRequestMoimJoin();

  const moimId = route.params.id as number;
  const {setIsEditMode} = useMoimCalendarStore();

  const {
    data: posts,
    isPending,
    isError,
    error,
  } = useGetMoimCalendar({
    moimId,
    month: monthYear.month,
    year: monthYear.year,
  });

  const handleRequestMoimJoin = () => {
    requestMoimJoimMutation.mutate(
      {
        moimId,
      },
      {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: '가입 신청되었습니다.',
            visibilityTime: 2000,
            position: 'bottom',
          });
        },
        onError: error => {
          console.error(error?.response);
          Toast.show({
            type: 'error',
            text1:
              error?.response?.data.message ||
              '가입 신청 중 오류가 발생했습니다.',
            visibilityTime: 2000,
            position: 'bottom',
          });
        },
      },
    );
  };

  if (isError) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <Typography className="text-2xl" fontWeight={'BOLD'}>
            {error?.response?.data.message}
          </Typography>
          <CustomButton
            label="가입하기"
            className="w-[80%] mt-10"
            textStyle="font-bold text-white text-xl"
            onPress={handleRequestMoimJoin}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (isPending) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size={'large'} />
        </View>
      </SafeAreaView>
    );
  }

  const handleUpdateMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };
  const handlePressDate = (date: number) => {
    setSelectedDate(date);
  };

  return (
    <SafeAreaView className={'bg-white flex-1'}>
      <MoimCalendar
        monthYear={monthYear}
        schedules={posts}
        onChangeMonth={handleUpdateMonth}
        selectedDate={selectedDate}
        onPressDate={handlePressDate}
      />
      <PlanCalendarEventList
        moimId={moimId}
        posts={posts[selectedDate]?.planList}
      />
      <FloatingButton
        type={'add'}
        onPress={() => {
          navigation.navigate('MOIM_PLAN_WRITE', {
            id: moimId,
          });
          setIsEditMode(false);
        }}
      />
    </SafeAreaView>
  );
};

export default MoimPlanHomeScreen;
