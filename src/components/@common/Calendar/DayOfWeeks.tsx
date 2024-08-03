import {Dimensions, Text, View} from 'react-native';

export function DayOfWeeks() {
  return (
    <View className="w-full flex-row mb-1">
      {['일', '월', '화', '수', '목', '금', '토'].map((dayOfWeek, idx) => {
        return (
          <View
            key={idx}
            style={{
              width: Dimensions.get('window').width / 7,
              alignItems: 'center',
            }}>
            <Text
              className={`
                text-black text-sm font-bold
                ${dayOfWeek === '토' && 'text-blue'}
                ${dayOfWeek === '일' && 'text-error'}
            `}>
              {dayOfWeek}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
