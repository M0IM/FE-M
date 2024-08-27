import {View, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import 'moment/locale/ko';
import moment from 'moment';

import {Typography} from 'components/@common/Typography/Typography';
import {TUserPlanDTO} from 'types/dtos/calendar.ts';

interface ScheduleCardProps extends TouchableOpacityProps {
  item: TUserPlanDTO;
}

const ScheduleCard = ({item, ...props}: ScheduleCardProps) => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      className="flex flex-col p-6 bg-gray-50 border-gray-200 border-[1px] rounded-xl w-[240] h-[160]">
      <View className="flex gap-3 flex-row items-center max-w-[230]">
        {item.planType === 'INDIVIDUAL_PLAN' ? (
          // If Individual Plan
          <View className="w-[5] h-[27] rounded-lg bg-main" />
        ) : (
          // If MoimPlan
          <View className="w-[5] h-[27] rounded-lg bg-error" />
        )}
        <Typography
          fontWeight="BOLD"
          className="text-gray-600 text-base"
          numberOfLines={1}>
          {item.title}
        </Typography>
      </View>
      <Typography
        fontWeight="MEDIUM"
        className="mt-1 ml-[17] text-xs text-gray-300"
        numberOfLines={1}>
        {moment(item.time).format('YYYY년 MM월 DD일')}
      </Typography>
      <Typography
        fontWeight="MEDIUM"
        className="mt-1 ml-[17] text-xs text-gray-300"
        numberOfLines={1}>
        {moment(item.time).fromNow()}
      </Typography>
      <Typography
        fontWeight="BOLD"
        className="mt-6 text-gray-500"
        numberOfLines={1}>
        {item.locationDetail}
      </Typography>
    </TouchableOpacity>
  );
};

export default ScheduleCard;
