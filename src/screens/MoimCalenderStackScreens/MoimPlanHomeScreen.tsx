import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from '../../components/@common/Typography/Typography.tsx';
import {getMonthYearDetails, getNewMonthYear} from '../../utils';
import {useState} from 'react';
import {Calendar} from '../../components/calendar/Calendar/Calendar.tsx';
import {posts} from '../CalendarStackScreens/CalendarHomeScreen.tsx';
import {CalendarEventList} from '../../components/@common/CalendarEventList/CalendarEventList.tsx';
import {SafeAreaView} from 'react-native';
import FloatingButton from '../../components/@common/FloatingButton/FloatingButton.tsx';
import {PlanCalendarEventList} from '../../components/@common/CalendarEventList/PlanCalendarEventList.tsx';

const MoimPlanHomeScreen = () => {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState(0);

  const handleUpdateMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };
  const handlePressDate = (date: number) => {
    setSelectedDate(date);
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
      <PlanCalendarEventList posts={posts[selectedDate]} />
      <FloatingButton type={'add'} onPress={() => {}} />
    </SafeAreaView>
  );
};

export default MoimPlanHomeScreen;
