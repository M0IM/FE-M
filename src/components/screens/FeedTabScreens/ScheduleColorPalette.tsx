import {Typography} from 'components/@common/Typography/Typography';
import {View} from 'react-native';

const ScheduleColorPalette = () => {
  return (
    <View className="flex flex-row gap-x-3 ml-auto">
      <View className="flex flex-row items-center">
        <View className="w-2 h-2 bg-main rounded-full" />
        <Typography
          numberOfLines={1}
          className="text-gray-400 text-xs ml-1"
          fontWeight={'LIGHT'}>
          내 일정
        </Typography>
      </View>
      <View className="flex flex-row items-center">
        <View className="w-2 h-2 bg-error rounded-full" />
        <Typography
          numberOfLines={1}
          className="text-gray-400 text-xs ml-1"
          fontWeight={'LIGHT'}>
          모임 일정
        </Typography>
      </View>
      <View className="flex flex-row items-center">
        <View className="w-2 h-2 bg-warning rounded-full" />
        <Typography
          numberOfLines={1}
          className="text-gray-400 text-xs ml-1"
          fontWeight={'LIGHT'}>
          할 일
        </Typography>
      </View>
    </View>
  );
};

export default ScheduleColorPalette;
