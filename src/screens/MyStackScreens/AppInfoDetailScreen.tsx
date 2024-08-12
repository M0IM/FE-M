import { Typography } from 'components/@common/Typography/Typography';
import { ScreenContainer } from 'components/ScreenContainer';
import { AppInfoStackRouteProp } from 'navigators/types';
import { View, Image } from 'react-native';

// TODO: 이후에 타입 변경 요망
type AppInfoDataType = {
  id: number;
  content: string;
  uri?: string;
}

const AppInfoData: AppInfoDataType[] = [
  {
    id: 1,
    content: '모임 업데이트는 앱스토어 및 구글 스토어에서 진행하실 수 있습니다..',
  },
  {
    id: 2,
    content: '업데이트 1. 멤버 후기 작성 기능이 추가되었습니다.',
    uri: 'https://images.unsplash.com/photo-1723199688073-0c18e53c321b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8',
  },
  {
    id: 3,
    content: '업데이트 2. 멤버 후기 작성 기능이 추가되었습니다.',
    uri: 'https://images.unsplash.com/photo-1723199688073-0c18e53c321b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8',
  },
  {
    id: 4,
    content: '지금 스토어에서 업데이트를 진행하고 새로운 기능을 사용해보세요!',
  },
];
interface AppInfoDetailScreenProps {
    route: AppInfoStackRouteProp;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AppInfoDetailScreen = ({ route }: AppInfoDetailScreenProps) => {
  const renderItem = (item: AppInfoDataType) => {
  if (item.uri) {
    return (
      <View key={item.id} className='flex flex-col gap-y-2'>
        <Typography fontWeight='MEDIUM' className='text-gray-400 text-sm'>{item.content}</Typography>
        <Image source={{uri: item.uri}} resizeMode='contain' className='w-full h-[200] rounded-lg' />
      </View>
    );
  } else if (item.content) {
    return <Typography key={item.id} fontWeight='MEDIUM' className='text-gray-400 text-sm'>{item.content}</Typography>;
  }
};

  return (
    <ScreenContainer>
      <View className='flex flex-col pb-5 border-b-[0.5px] border-gray-200'>
        <Typography fontWeight='BOLD' className='text-lg text-dark-800 mt-4'>[공지] 모임이 새롭게 업데이트 되었어요.</Typography>
        <Typography fontWeight='MEDIUM' className='text-sm text-gray-300 mt-1'>2024.05.01</Typography>
      </View>
      <View className='flex flex-col gap-y-5'>
        {AppInfoData.map((item) => renderItem(item))}
      </View>
    </ScreenContainer>
  );
};

export default AppInfoDetailScreen;