import {View} from 'react-native';
import {Typography} from 'components/@common/Typography/Typography.tsx';

import Octicons from 'react-native-vector-icons/Octicons';
import IonIcons from 'react-native-vector-icons/Ionicons';

interface IDetailItemProps {
  iconType?: 'Octicions' | 'IonIcons';
  iconName: string;
  title: string;
  content: string | undefined;
  isMemo?: boolean;
}

const DetailItem = ({
  iconType = 'Octicions',
  iconName,
  title,
  content,
  isMemo = false,
}: IDetailItemProps) => (
  <View className="mt-4">
    <View className="flex-row items-center gap-x-3 mb-3">
      {iconType === 'Octicions' ? (
        <Octicons name={iconName} size={20} color="#00F0A1" />
      ) : (
        <IonIcons name={iconName} size={20} color="#00F0A1" />
      )}
      <Typography
        numberOfLines={1}
        className="text-gray-500 text-sm ml-2"
        fontWeight={'BOLD'}>
        {title}
      </Typography>
    </View>
    <View
      className={`border p-4 border-gray-200 rounded-xl flex-row ${isMemo && 'h-[200px]'}`}>
      <Typography className="text-base text-dark-800" fontWeight={'MEDIUM'}>
        {content}
      </Typography>
    </View>
  </View>
);

export {DetailItem};
