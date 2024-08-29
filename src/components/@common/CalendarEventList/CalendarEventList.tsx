import {ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {CalendarEvent} from '../../calendar/CalendarEvent/CalendarEvent.tsx';
import {Typography} from '../Typography/Typography.tsx';

import {TPlanListDTO} from 'types/dtos/calendar.ts';
import {useNavigation} from '@react-navigation/native';
import {HomeStackNavigationProp} from '../../../navigators/types';

interface ICalendarEventListProps {
  posts?: TPlanListDTO[];
}

export function CalendarEventList({posts}: ICalendarEventListProps) {
  const {bottom} = useSafeAreaInsets();
  const navigation = useNavigation<HomeStackNavigationProp>();

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
        {posts?.map(post => (
          <CalendarEvent
            key={post.planId}
            post={post}
            onPress={() => {
              post.planType === 'MOIM_PLAN'
                ? navigation.navigate('CALENDAR_PARTICIPANT_DETAIL', {
                    id: post.planId,
                  })
                : navigation.navigate('CALENDAR_INDIVIDUAL_DETAIL', {
                    id: post.planId,
                  });
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
}
