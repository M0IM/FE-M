import {Platform, Pressable, PressableProps, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {cva} from 'class-variance-authority';
import {cn} from 'utils/cn.ts';
import {MoimPlanStackNavigationProp} from 'navigators/types';
import {TMoimPlanListDTO} from 'types/dtos/calendar.ts';

interface ICalendarEventProps extends PressableProps {
  post: TMoimPlanListDTO;
}

export function PlanCalendarEvent({post, ...props}: ICalendarEventProps) {
  const navigation = useNavigation<MoimPlanStackNavigationProp>();
  const platform = Platform.OS;

  return (
    <Pressable
      {...props}
      onPress={() =>
        navigation.navigate('MOIM_PLAN_DETAIL', {
          id: post.planId,
        })
      }
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
          <Text className="text-xs text-gray-400">{post.time}</Text>
          <Text className="text-xs text-gray-400">{post.location}</Text>
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
