import {ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {PlanCalendarEvent} from '../../planCalendar/PlanCalendarEvent.tsx';

import {TMoimPlanListDTO} from 'types/dtos/calendar.ts';

interface IPlanCalendarEventListProps {
  posts: TMoimPlanListDTO[];
}

export function PlanCalendarEventList({posts}: IPlanCalendarEventListProps) {
  const {bottom} = useSafeAreaInsets();

  return (
    <ScrollView scrollIndicatorInsets={{right: 1}}>
      <View
        style={{
          marginBottom: bottom,
        }}
        className="p-4 items-center justify-center">
        {posts?.map(post => (
          <PlanCalendarEvent key={post.planId} post={post} />
        ))}
      </View>
    </ScrollView>
  );
}
