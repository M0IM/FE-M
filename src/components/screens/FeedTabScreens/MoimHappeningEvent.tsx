import {View} from 'react-native';
import {Typography} from '../../@common/Typography/Typography.tsx';
import PostPreviewBox from '../../home/PostPreviewBox/PostPreviewBox.tsx';
import {useEffect} from 'react';

interface MoimHappeningEventProps {
  isRefreshing: boolean;
}

export default function MoimHappeningEvent({
  isRefreshing,
}: MoimHappeningEventProps) {
  useEffect(() => {
    const refetch = async () => {
      if (isRefreshing) {
        console.log('리패칭');
      }
    };
    refetch();
  }, [isRefreshing]);

  return (
    <View className="flex flex-col">
      <Typography className="text-lg mb-4 text-dark-800" fontWeight={'BOLD'}>
        모임에 무슨일이 일어나고 있나요?
      </Typography>
      <PostPreviewBox />
    </View>
  );
}
