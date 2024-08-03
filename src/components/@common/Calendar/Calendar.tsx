import {Pressable, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function Calendar() {
  return (
    <View>
      <Pressable>
        <Ionicons name="arrow-back" size={24} />
      </Pressable>
      <Pressable>
        <Text>2024년 10월</Text>
      </Pressable>
      <Pressable></Pressable>
    </View>
  );
}
