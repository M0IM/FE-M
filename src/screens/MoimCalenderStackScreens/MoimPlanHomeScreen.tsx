import {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Calendar} from 'components/calendar/Calendar/Calendar.tsx';
import {posts} from '../CalendarStackScreens/CalendarHomeScreen.tsx';
import FloatingButton from 'components/@common/FloatingButton/FloatingButton.tsx';
import {PlanCalendarEventList} from 'components/@common/CalendarEventList/PlanCalendarEventList.tsx';
import {getMonthYearDetails, getNewMonthYear} from 'utils';
import {
  MoimPlanStackNavigationProp,
  MoimPlanStackRouteProp,
  MoimStackNavigationProp,
} from 'navigators/types';
import {CompositeNavigationProp} from '@react-navigation/native';
import {useGetMoimCalendar} from '../../hooks/queries/MoimPlanHomeScreen/useGetMoimCalendar.ts';

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

  const handleUpdateMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };
  const handlePressDate = (date: number) => {
    setSelectedDate(date);
  };

  // TODO: CREATE 생성 시 데이터 연결.
  const {data, isPending, isError} = useGetMoimCalendar({
    moimId,
    month: monthYear.month,
    year: monthYear.year,
  });

  return (
    <SafeAreaView className={'bg-white flex-1'}>
      <Calendar
        monthYear={monthYear}
        schedules={posts}
        onChangeMonth={handleUpdateMonth}
        selectedDate={selectedDate}
        onPressDate={handlePressDate}
      />
      <PlanCalendarEventList posts={posts[selectedDate]} />
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
