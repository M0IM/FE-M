import {Pressable, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {FeedTabNavigationProp} from '../../navigators/types';

export function FeedTabHeaderRight(navigation: FeedTabNavigationProp) {
  return (
    <View className="flex flex-row items-center justify-center">
      <Pressable className="active:bg-hover p-1 rounded-2xl mr-3">
        <Ionicons name="search" size={24} color="#1D2002" />
      </Pressable>
      <Pressable className="active:bg-hover p-1 rounded-2xl mr-3">
        <Ionicons name="notifications-outline" size={24} color="#1D2002" />
      </Pressable>
    </View>
  );
}
