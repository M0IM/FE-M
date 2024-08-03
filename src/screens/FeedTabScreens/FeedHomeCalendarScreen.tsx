import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Calendar} from 'components/@common/Calendar/Calendar.tsx';

import {getMonthYearDetails, getNewMonthYear} from 'utils';
import {useState} from 'react';
import {SafeAreaView, View} from 'react-native';

export default function FeedHomeCalendarScreen() {
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
    <SafeAreaView className="bg-white flex-1">
      <Calendar
        monthYear={monthYear}
        onChangeMonth={handleUpdateMonth}
        selectedDate={selectedDate}
        onPressDate={handlePressDate}
      />
    </SafeAreaView>
  );
}
