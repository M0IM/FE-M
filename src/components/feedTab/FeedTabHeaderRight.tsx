import {Pressable, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {FeedTabNavigationProp} from '../../navigators/types';

export function FeedTabHeaderRight(navigation: FeedTabNavigationProp) {
  return (
    <View className="flex flex-row items-center justify-center gap-4 mr-2">
      <Pressable className="active:bg-hover p-1 rounded-2xl">
        <Ionicons name="search" size={24} />
      </Pressable>
      <Pressable className="active:bg-hover p-1 rounded-2xl">
        <Ionicons name="notifications-outline" size={24} />
      </Pressable>
    </View>
  );
}
