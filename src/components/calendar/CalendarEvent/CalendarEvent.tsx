import {Pressable, PressableProps, Text, View} from 'react-native';
import {CalendarPost} from '../../../screens/FeedTabScreens/FeedHomeCalendarScreen.tsx';

interface ICalendarEventProps extends PressableProps {
  post: CalendarPost;
}

export function CalendarEvent({post, ...props}: ICalendarEventProps) {
  return (
    <Pressable
      {...props}
      className="flex-row my-3 items-center justify-center w-[323px] h-[88px]"
      key={post.id}>
      <View className="bg-main w-1 rounded-l-full h-full z-10" />
      <View className="bg-white p-4 rounded-r-2xl shadow-lg flex-1">
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-black font-bold text-lg">
          {post.title}
        </Text>
        <View className="mt-1">
          <Text className="text-xs text-gray-400">{post.date}</Text>
          <Text className="text-xs text-gray-400">{post.address}</Text>
        </View>
      </View>
    </Pressable>
  );
}
