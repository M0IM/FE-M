import {View} from 'react-native';
import moment from 'moment';
import 'moment/locale/ko';

import {Typography} from 'components/@common/Typography/Typography';

// TODO: 예시 타입입니다. 추후에 변경 예정
type DetailScheduleType = {
  startTime: string;
  title: string;
};

interface DetailSchedulesProps {
  detailSchedules: DetailScheduleType[];
  type?: 'full' | 'preview';
}

const DetailSchedules = ({
  detailSchedules,
  type = 'full',
}: DetailSchedulesProps) => {
  const scheduleList =
    detailSchedules.length > 6 ? detailSchedules.slice(0, 5) : detailSchedules;

  return (
    <View className="flex flex-row">
      <View className="w-[4px] h-full rounded-md bg-main mr-2" />
      <View className="flex-col gap-y-4">
        {(type === 'full' ? detailSchedules : scheduleList).map(
          (item, index) => (
            <View key={index} className="flex flex-row">
              <Typography
                fontWeight="MEDIUM"
                className="text-gray-500 text-xs mr-5">
                {moment(item.startTime).format('A hh시 mm분')}
              </Typography>
              <Typography fontWeight="MEDIUM" className="text-gray-500 text-xs">
                {item.title}
              </Typography>
            </View>
          ),
        )}
      </View>
    </View>
  );
};

export default DetailSchedules;
