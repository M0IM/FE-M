import {TouchableOpacity, View} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';

import {Typography} from '../../@common/Typography/Typography.tsx';

interface IMoimWriteBarProps {
  onPress: () => void;
}

export function MoimWriteBar({onPress}: IMoimWriteBarProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-full px-5 flex-row items-center justify-center bg-main h-[100] rounded-3xl">
      <IonIcons name={'home'} color={'#fff'} size={35} />
      <View className="flex-1 ml-4">
        <Typography className="text-white text-lg mb-1" fontWeight={'BOLD'}>
          새로운 모임을 만들어보세요.
        </Typography>
        <Typography className="text-gray-100 " fontWeight={'LIGHT'}>
          모임을 직접 만들고 운영할 수 있어요
        </Typography>
      </View>
      <IonIcons name={'chevron-forward-sharp'} color={'#fff'} size={30} />
    </TouchableOpacity>
  );
}
