import {View} from 'react-native';
import {Typography} from 'components/@common/Typography/Typography.tsx';

import Octicons from 'react-native-vector-icons/Octicons';

interface IDetailItemProps {
  iconName: string;
  title: string;
  content: string | undefined;
  isMemo?: boolean;
}

const DetailItem = ({
  iconName,
  title,
  content,
  isMemo = false,
}: IDetailItemProps) => (
  <View className="mt-4">
    <View className="flex-row items-center gap-x-3 mb-3">
      <Octicons name={iconName} size={24} color="#00F0A1" />
      <Typography className="text-gray-700 text-lg ml-2" fontWeight={'BOLD'}>
        {title}
      </Typography>
    </View>
    <View
      className={`border p-4 border-gray-200 rounded-xl bg-green-50 flex-row ${isMemo && 'h-[200px]'}`}>
      <Typography className="text-base text-gray-600" fontWeight={'BOLD'}>
        {content}
      </Typography>
    </View>
  </View>
);

export {DetailItem};
