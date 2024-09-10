import {useState} from 'react';
import {SafeAreaView, View} from 'react-native';

import {Calendar} from 'components/calendar/Calendar/Calendar.tsx';
import {CalendarEventList} from 'components/@common/CalendarEventList/CalendarEventList.tsx';
import FloatingButton from 'components/@common/FloatingButton/FloatingButton.tsx';
import ScheduleColorPalette from 'components/screens/FeedTabScreens/ScheduleColorPalette';

import {getMonthYearDetails, getNewMonthYear} from 'utils';
import {CalendarStackNavigationProp} from 'navigators/types';
import {useGetPersonalCalendar} from 'hooks/queries/CalendarHomeScreen/useGetPersonalCalendar.ts';
import useMyCalendarStore from '../../stores/useMyCalendarStore.ts';

export default function CalendarHomeScreen({
  navigation,
}: {
  navigation: CalendarStackNavigationProp;
}) {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState(0);
  const {setIsEditMode} = useMyCalendarStore();
  const {
    data: posts,
    isPending,
    isError,
  } = useGetPersonalCalendar({
    month: monthYear.month,
    year: monthYear.year,
  });

  if (isPending || isError) {
    return <></>;
  }

  const handlePressDate = (date: number) => {
    setSelectedDate(date);
  };

  const handleUpdateMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  return (
    <SafeAreaView className={'bg-white flex-1'}>
      <Calendar
        monthYear={monthYear}
        schedules={posts}
        onChangeMonth={handleUpdateMonth}
        selectedDate={selectedDate}
        onPressDate={handlePressDate}
      />
      <View className="px-3">
        <ScheduleColorPalette />
      </View>
      <CalendarEventList posts={posts[selectedDate]} />
      <FloatingButton
        type={'add'}
        onPress={() => {
          setIsEditMode(false);
          navigation.navigate('CALENDAR_WRITE');
        }}
      />
    </SafeAreaView>
  );
}
