import {View} from 'react-native';
import {Typography} from '../../@common/Typography/Typography.tsx';
import PostPreviewBox from '../../home/PostPreviewBox/PostPreviewBox.tsx';
import {useEffect} from 'react';
import useGetMoimAllPosts from 'hooks/queries/FeedHome/useGetMoimAllPosts.ts';

interface MoimHappeningEventProps {
  isRefreshing: boolean;
}

export default function MoimHappeningEvent({
  isRefreshing,
}: MoimHappeningEventProps) {
  const {
    data,
    isPending,
    isError,
    refetch: refetchMoimAllPosts,
  } = useGetMoimAllPosts({});

  useEffect(() => {
    const refetch = async () => {
      if (isRefreshing) {
        await refetchMoimAllPosts();
      }
    };
    refetch();
  }, [isRefreshing]);

  if (isPending) {
    return <Typography fontWeight="MEDIUM">로딩 중</Typography>;
  }

  if (isError) {
    return;
  }

  return (
    <View className="flex flex-col">
      <Typography className="text-lg mb-4 text-dark-800" fontWeight={'BOLD'}>
        모임에 무슨일이 일어나고 있나요?
      </Typography>
      <PostPreviewBox allPosts={data} />
    </View>
  );
}
