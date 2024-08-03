import {FlatList, Pressable, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {DayOfWeeks} from './DayOfWeeks.tsx';
import {DateBox} from './DateBox.tsx';

import {isSameAsCurrentDate, MonthYear} from 'utils';

interface ICalendarProps<T> {
  monthYear: MonthYear;
  schedules: Record<number, T>;
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
  return (
    <>
      <View className="flex-row items-center justify-center">
        <View className="flex-row items-center justify-between my-6 mx-4 bg-gray-100 w-3/5 rounded-2xl">
          <Pressable className="p-3" onPress={() => onChangeMonth(-1)}>
            <Ionicons name="chevron-back" size={25} color={'#000'} />
          </Pressable>
          <Pressable className="flex-row items-center p-2">
            <Text className="text-lg font-bold text-black">
              {year}년 {month}월
            </Text>
            <MaterialIcons
              name={'keyboard-arrow-down'}
              size={20}
              color={'#000'}
            />
          </Pressable>
          <Pressable className="p-3" onPress={() => onChangeMonth(1)}>
            <Ionicons name="chevron-forward" size={25} color={'#000'} />
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
          keyExtractor={item => String(item.id)}
          numColumns={7}
        />
      </View>
    </>
  );
}
