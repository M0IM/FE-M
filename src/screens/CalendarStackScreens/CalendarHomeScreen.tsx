import {useState} from 'react';
import {SafeAreaView} from 'react-native';

import {Calendar} from 'components/calendar/Calendar/Calendar.tsx';
import {CalendarEventList} from 'components/@common/CalendarEventList/CalendarEventList.tsx';

import {getMonthYearDetails, getNewMonthYear} from 'utils';
import FloatingButton from 'components/@common/FloatingButton/FloatingButton.tsx';
import {CalendarStackNavigationProp} from '../../navigators/types';
import MyCalendarBottomSheet from '../../components/myCalendarBottomSheet/myCalendarBottomSheet.tsx';
import {useGetPersonalCalendar} from '../../hooks/queries/CalendarHome/useGetPersonalCalendar.ts';

export type CalendarPost = {
  id: number;
  title: string;
  date: string;
  address: string;
};

export const posts: Record<number, CalendarPost[]> = {
  8: [
    {
      id: 1,
      title: '매주 월요일 정기 스터디',
      date: '오후 5:30',
      address: '서울시 강남구 테헤란로 123',
    },
    {
      id: 2,
      title: '팀 회의',
      date: '오후 2:00',
      address: '서울시 강남구 테헤란로 123',
    },
    {
      id: 3,
      title: '개발자 워크숍',
      date: '오전 10:00',
      address: '서울시 강남구 논현로 456',
    },
    {
      id: 4,
      title: '클라이언트 미팅',
      date: '오후 4:00',
      address: '서울시 중구 명동 789',
    },
  ],
  15: [
    {
      id: 5,
      title: '사라와 점심',
      date: '오후 12:30',
      address: '서울시 종로구 카페 딜라이트',
    },
  ],
  18: [
    {
      id: 6,
      title: '헬스장 운동',
      date: '오후 6:00',
      address: '서울시 송파구 피트짐',
    },
  ],
  22: [
    {
      id: 7,
      title: '병원 예약',
      date: '오전 9:00',
      address: '서울시 강서구 헬스 클리닉',
    },
  ],
  31: [
    {
      id: 8,
      title: '생일 파티',
      date: '오후 7:00',
      address: '서울시 강남구 파티 홀',
    },
  ],
};

type TCalendarHomeScreenProps = {
  navigation: CalendarStackNavigationProp;
};

export default function CalendarHomeScreen({
  navigation,
}: TCalendarHomeScreenProps) {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const handleUpdateMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };
  const handlePressDate = (date: number) => {
    setSelectedDate(date);
  };
  const {data, isPending, isError} = useGetPersonalCalendar({
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
      <CalendarEventList posts={posts[selectedDate]} />
      <FloatingButton type={'add'} onPress={open} />
      <MyCalendarBottomSheet isOpen={isOpen} onOpen={open} onClose={close} />
    </SafeAreaView>
  );
}
