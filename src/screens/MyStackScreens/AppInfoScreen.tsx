import { AppInfoStackNavigatorProp } from 'navigators/types';
import { TouchableOpacity, View } from 'react-native';
import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';

const testAppInfoList = [
  {
    id: 1,
    title: '[공지] 알림 설정을 허용하시면 바로 알림을 받을 수 있어요.',
    contentPreview: 'MOIM의 새로운 기능 업데이트 및 서비스 이벤트에 관련된\n새로운 소식을 푸시 알림으로 알려드립니다.',
    createdAt: '2024.05.01'
  },
  {
    id: 2,
    title: '[공지] 모임이 새롭게 업데이트되었어요.',
    contentPreview: '모임 업데이트는 앱스토어 및 구글 스토어에서 진행하실 수 있습니다.',
    createdAt: '2024.05.01'
  }
];

interface AppInfoScreenProps {
  navigation: AppInfoStackNavigatorProp;
}

export default function AppInfoScreen({navigation}: AppInfoScreenProps) {
  return (
    <ScreenContainer>
      <View className='flex flex-col mt-4 mb-3'>
        <Typography fontWeight={'BOLD'} className='text-2xl mt-1 text-dark-800'>앱 버전 1.0.0</Typography>
        <Typography fontWeight={'MEDIUM'} className='text-base text-gray-400'>MOIM의 새로운 소식을 알려드립니다.</Typography>
      </View>

      {testAppInfoList.map((item) => (
          <TouchableOpacity 
            onPress={() => navigation.navigate('APP_INFO_DETAIL', { id: item.id })}
            key={item.id}
            className='flex flex-col pb-5 border-b-0.5 border-gray-200'
          >
            <Typography fontWeight='BOLD' className='text-dark-800 text-base'>{item.title}</Typography>
            <Typography fontWeight='MEDIUM' className='text-gray-400 text-sm'>{item.contentPreview}</Typography>
          </TouchableOpacity>
      ))}
    </ScreenContainer>
  );
}
