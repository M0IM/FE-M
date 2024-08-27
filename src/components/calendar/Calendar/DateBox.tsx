import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';

interface IDateBoxProps {
  date: number;
  selectedDate: number;
  onPressDate: (date: number) => void;
  isToday: boolean;
  hasSchedule: boolean;
  isMemberBusy?: number;
}

const deviceWidth = Dimensions.get('window').width;

export function DateBox({
  date,
  selectedDate,
  onPressDate,
  hasSchedule,
  isToday,
  isMemberBusy,
}: IDateBoxProps) {
  console.log(isMemberBusy);
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
        <>
          <View
            className={`absolute flex-col bottom-5 mt-5 items-center justify-center w-6 h-6 rounded-full
            ${selectedDate === date && 'bg-main'}`}>
            <Text
              style={{
                fontFamily: 'Pretendard-Medium',
              }}
              className={`relative text-xs text-black 
              ${selectedDate === date && 'text-white font-bold'}
              ${isToday && 'text-error font-bold'}
              `}>
              {date}
            </Text>
            {/*<View className="absolute top-7 left-[40%] mt-1">*/}
            {/*  {isMemberBusy && hasSchedule ? (*/}
            {/*    <View className="w-1 h-1 rounded-sm bg-main" />*/}
            {/*  ) : null}*/}
            {/*</View>*/}
            <View className="absolute top-7 left-[40%] mt-1">
              {hasSchedule ? (
                <View className="w-1 h-1 rounded-sm bg-main" />
              ) : null}
            </View>
          </View>
        </>
      )}
    </Pressable>
  );
}
