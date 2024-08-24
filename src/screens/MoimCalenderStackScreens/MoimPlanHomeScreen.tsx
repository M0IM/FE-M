import {useState} from 'react';
import {SafeAreaView} from 'react-native';

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

interface IMoimPlanHomeScreenProps {
  route: MoimPlanStackRouteProp;
  navigation: MoimPlanStackNavigationProp;
}

const MoimPlanHomeScreen = ({route, navigation}: IMoimPlanHomeScreenProps) => {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState(0);
  const moimId = route.params.id as number;
  const {setIsEditMode} = useMoimCalendarStore();

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
