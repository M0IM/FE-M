import {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {CompositeNavigationProp} from '@react-navigation/native';

import {Calendar} from 'components/calendar/Calendar/Calendar.tsx';
import FloatingButton from 'components/@common/FloatingButton/FloatingButton.tsx';
import {PlanCalendarEventList} from 'components/@common/CalendarEventList/PlanCalendarEventList.tsx';

import {getMonthYearDetails, getNewMonthYear} from 'utils';
import {
  MoimPlanStackNavigationProp,
  MoimPlanStackRouteProp,
  MoimStackNavigationProp,
} from 'navigators/types';
import {useGetMoimCalendar} from 'hooks/queries/MoimPlanHomeScreen/useGetMoimCalendar.ts';
import {MoimCalendar} from '../../components/calendar/Calendar/MoimCalendar.tsx';
import {TCalendarMoimPlanDTO} from '../../types/dtos/calendar.ts';

interface IMoimPlanHomeScreenProps {
  route: MoimPlanStackRouteProp;
  navigation: CompositeNavigationProp<
    MoimPlanStackNavigationProp,
    MoimStackNavigationProp
  >;
}

const MoimPlanHomeScreen = ({route, navigation}: IMoimPlanHomeScreenProps) => {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState(0);
  const moimId = route.params.id as number;

  const {
    data: posts,
    isPending,
    isError,
  } = useGetMoimCalendar({
    moimId,
    month: monthYear.month,
    year: monthYear.year,
  });

  if (isPending || isError) {
    return <></>;
  }

  const handleUpdateMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };
  const handlePressDate = (date: number) => {
    setSelectedDate(date);
  };

  console.log(posts);

  return (
    <SafeAreaView className={'bg-white flex-1'}>
      <MoimCalendar<TCalendarMoimPlanDTO>
        monthYear={monthYear}
        schedules={posts}
        onChangeMonth={handleUpdateMonth}
        selectedDate={selectedDate}
        onPressDate={handlePressDate}
      />
      <PlanCalendarEventList posts={posts[selectedDate]?.planList} />
      <FloatingButton
        type={'add'}
        onPress={() => {
          navigation.navigate('MOIM_WRITE', {
            id: moimId,
          });
        }}
      />
    </SafeAreaView>
  );
};

export default MoimPlanHomeScreen;
