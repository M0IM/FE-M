import {View, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {Typography} from 'components/@common/Typography/Typography';

interface ScheduleCardProps extends TouchableOpacityProps {
  schedule: string;
  date: string;
  time: string;
  spaceName: string;
}

const ScheduleCard = ({
  schedule,
  date,
  time,
  spaceName,
  ...props
}: ScheduleCardProps) => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      className="flex flex-col p-6 bg-gray-50 border-gray-200 border-[1px] rounded-xl max-w-[280] h-[160]">
      <View className="flex gap-3 flex-row items-center max-w-[230]">
        <View className="w-[5] h-[27] rounded-lg bg-main" />
        <Typography
          fontWeight="MEDIUM"
          className="text-dark-800 text-base"
          numberOfLines={1}>
          {schedule}
        </Typography>
      </View>
      <Typography
        fontWeight="MEDIUM"
        className="mt-1 ml-[17] text-xs text-gray-300"
        numberOfLines={1}>
        {date}
      </Typography>
      <Typography
        fontWeight="MEDIUM"
        className="mt-1 ml-[17] text-xs text-gray-300"
        numberOfLines={1}>
        {time}
      </Typography>
      <Typography
        fontWeight="BOLD"
        className="mt-6 text-dark-800"
        numberOfLines={1}>
        {spaceName}
      </Typography>
    </TouchableOpacity>
  );
};

export default ScheduleCard;
