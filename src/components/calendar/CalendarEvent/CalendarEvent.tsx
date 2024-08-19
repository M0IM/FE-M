import {Platform, Pressable, PressableProps, Text, View} from 'react-native';

import {cva} from 'class-variance-authority';
import {cn} from 'utils/cn.ts';
import {TPlanListDTO} from 'types/dtos/calendar.ts';
import {getMonthYearDetails} from 'utils';

interface ICalendarEventProps extends PressableProps {
  post: TPlanListDTO;
}

export function CalendarEvent({post, ...props}: ICalendarEventProps) {
  const platform = Platform.OS;
  const {month, year, day} = getMonthYearDetails(new Date(post.time));

  return (
    <Pressable
      {...props}
      className="flex-row my-3 items-center justify-center w-[323px] h-[88px]"
      key={post.planId}>
      <View className="bg-main w-1 rounded-l-full h-full z-10" />
      <View className={cn(CalenderEventVariant({platform}))}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-dark-800 font-bold text-base mb-1">
          {post.title}
        </Text>
        <View className="mt-1">
          <Text className="text-xs text-gray-400">
            {year}년 {month}월 {day}일
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const CalenderEventVariant = cva('bg-white p-4 rounded-r-2xl flex-1', {
  variants: {
    platform: {
      ios: 'shadow shadow-gray-200',
      android: 'elevation-lg shadow-gray-300',
      windows: 'shadow shadow-gray-200',
      macos: 'shadow shadow-gray-200',
      web: 'shadow shadow-gray-200',
    },
  },
});
