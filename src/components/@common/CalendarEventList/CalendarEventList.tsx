import {ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {CalendarEvent} from '../../calendar/CalendarEvent/CalendarEvent.tsx';
import {Typography} from '../Typography/Typography.tsx';

import {TPlanListDTO} from 'types/dtos/calendar.ts';

interface ICalendarEventListProps {
  posts?: TPlanListDTO[];
}

export function CalendarEventList({posts}: ICalendarEventListProps) {
  const {bottom} = useSafeAreaInsets();

  if (!posts) {
    return (
      <View className="flex-col flex-1 items-center justify-center">
        <Typography fontWeight={'BOLD'} className="text-base text-gray-300">
          일정이 없습니다.
        </Typography>
      </View>
    );
  }

  return (
    <ScrollView scrollIndicatorInsets={{right: 1}}>
      <View
        style={{
          marginBottom: bottom,
        }}
        className="p-4 items-center justify-center">
        {posts?.map(post => <CalendarEvent key={post.planId} post={post} />)}
      </View>
    </ScrollView>
  );
}
