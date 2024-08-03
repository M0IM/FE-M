import {ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CalendarPost} from '../../../screens/CalendarStackScreens/CalendarHomeScreen.tsx';
import {CalendarEvent} from '../../calendar/CalendarEvent/CalendarEvent.tsx';

interface ICalendarEventListProps {
  posts: CalendarPost[];
}

export function CalendarEventList({posts}: ICalendarEventListProps) {
  // 아랫부분이 잘리지 않도록
  const {bottom} = useSafeAreaInsets();

  return (
    <ScrollView scrollIndicatorInsets={{right: 1}}>
      <View
        style={{
          marginBottom: bottom,
        }}
        className="p-4 items-center justify-center">
        {posts?.map(post => <CalendarEvent key={post.id} post={post} />)}
      </View>
    </ScrollView>
  );
}
