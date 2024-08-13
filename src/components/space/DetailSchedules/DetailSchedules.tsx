import {Typography} from 'components/@common/Typography/Typography';
import {View} from 'react-native';

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
      <View className="w-[4px] h-full rounded-md bg-main mr-5" />
      <View>
        {(type === 'full' ? detailSchedules : scheduleList).map(
          (item, index) => (
            <View key={index} className="flex flex-row mb-3">
              <Typography
                fontWeight="MEDIUM"
                className="text-gray-500 text-xs mr-5">
                {item.startTime}
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
