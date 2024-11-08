import {View} from 'react-native';
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
      <View className="flex-col flex-1 my-10 items-center justify-center">
        <Typography fontWeight={'BOLD'} className="text-base text-gray-300">
          일정이 없습니다.
        </Typography>
      </View>
    );
  }

  return (
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
            switch (post.planType) {
              case 'MOIM_PLAN':
                navigation.navigate('CALENDAR_PARTICIPANT_DETAIL', {
                  id: post.planId,
                });
                break;
              case 'INDIVIDUAL_PLAN':
                navigation.navigate('CALENDAR_INDIVIDUAL_DETAIL', {
                  id: post.planId,
                });
                break;
              default:
                navigation.navigate('CALENDAR_TODO_DETAIL', {
                  moimId: post.moimId,
                  id: post.planId,
                });
                break;
            }
          }}
        />
      ))}
    </View>
  );
}
