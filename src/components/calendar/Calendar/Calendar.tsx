import {FlatList, Pressable, Text, View} from 'react-native';
import {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {DayOfWeeks} from './DayOfWeeks.tsx';
import {DateBox} from './DateBox.tsx';

import {getMonthYearDetails, isSameAsCurrentDate, MonthYear} from 'utils';
import DateBottomSheet from '../../DateBottomSheet/DateBottomSheet.tsx';

interface ICalendarProps<T> {
  monthYear: MonthYear;
  schedules: Record<string, T>;
  onChangeMonth: (increment: number) => void;
  onPressDate: (date: number) => void;
  selectedDate: number;
}

export function Calendar<T>({
  monthYear,
  onChangeMonth,
  onPressDate,
  selectedDate,
  schedules,
}: ICalendarProps<T>) {
  const {month, year, lastDate, firstDOW} = monthYear;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const [pickerDate, setPickerDate] = useState(
    new Date(year, month - 1, selectedDate || 1),
  );

  const handleDateChange = (date: Date) => {
    const newMonthYear = getMonthYearDetails(date);
    onPressDate(date.getDate());
    setPickerDate(date);

    if (newMonthYear.month !== month || newMonthYear.year !== year) {
      onChangeMonth(
        newMonthYear.month - month + (newMonthYear.year - year) * 12,
      );
    }

    close();
  };

  return (
    <>
      <View className="flex-row items-center justify-center">
        <View className="flex-row items-center justify-between my-6 mx-4 bg-gray-50 w-3/5 rounded-3xl border-gray-200 border-[0.5px]">
          <Pressable className="p-3" onPress={() => onChangeMonth(-1)}>
            <Ionicons name="chevron-back" size={25} color={'#E9ECEF'} />
          </Pressable>
          <Pressable className="flex-row items-center p-2" onPress={open}>
            <Text className="text-base font-light text-gray-500">
              {year}년 {month}월
            </Text>
            {isOpen ? (
              <MaterialIcons
                name={'keyboard-arrow-up'}
                size={20}
                color={'#72787F'}
              />
            ) : (
              <MaterialIcons
                name={'keyboard-arrow-down'}
                size={20}
                color={'#72787F'}
              />
            )}
          </Pressable>
          <Pressable className="p-3" onPress={() => onChangeMonth(1)}>
            <Ionicons name="chevron-forward" size={25} color={'#E9ECEF'} />
          </Pressable>
        </View>
      </View>
      {/* 요일 표시 */}
      <DayOfWeeks />
      {/* 날짜 표시 */}
      <View className="border-b-gray-500">
        <FlatList
          data={Array.from({length: lastDate + firstDOW}, (_, i) => ({
            id: i,
            date: i - firstDOW + 1,
          }))}
          renderItem={({item}) => (
            <DateBox
              date={item.date}
              hasSchedule={Boolean(schedules[item.date])}
              selectedDate={selectedDate}
              isToday={isSameAsCurrentDate(year, month, item.date)}
              onPressDate={onPressDate}
            />
          )}
          scrollEnabled={false}
          keyExtractor={item => String(item.id)}
          numColumns={7}
        />
      </View>
      <DateBottomSheet
        isOpen={isOpen}
        onOpen={open}
        onClose={close}
        date={pickerDate}
        onDateChange={setPickerDate}
        onPress={() => handleDateChange(pickerDate)}
      />
    </>
  );
}
