import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';

interface IDateBoxProps {
  date: number;
  selectedDate: number;
  onPressDate: (date: number) => void;
}

const deviceWidth = Dimensions.get('window').width;

export function DateBox({date, selectedDate, onPressDate}: IDateBoxProps) {
  return (
    <Pressable
      onPress={() => onPressDate(date)}
      style={{
        width: deviceWidth / 7,
        height: deviceWidth / 7,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'lightgray',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}>
      {date > 0 && (
        <View
          className={`absolute bottom-5 mt-5 items-center justify-center w-6 h-6 rounded-full
            ${selectedDate === date && 'bg-main'}`}>
          <Text
            style={{
              fontFamily: 'Pretendard-Medium',
            }}
            className={`test-sm text-black ${selectedDate === date && 'text-white font-bold'}`}>
            {date}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
