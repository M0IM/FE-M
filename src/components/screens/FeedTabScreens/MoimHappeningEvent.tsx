import { View } from 'react-native';
import {Typography} from '../../@common/Typography/Typography.tsx';
import PostPreviewBox from '../../home/PostPreviewBox/PostPreviewBox.tsx';

export default function MoimHappeningEvent() {
  return (
    <View className='flex flex-col'>
      <Typography className="text-lg mb-4 text-dark-800" fontWeight={'BOLD'}>
        모임에 무슨일이 일어나고 있나요?
      </Typography>
      <PostPreviewBox />
    </View>
  );
}
