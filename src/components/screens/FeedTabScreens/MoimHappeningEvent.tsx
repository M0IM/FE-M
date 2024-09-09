import {useEffect} from 'react';
import {View} from 'react-native';

import {Typography} from '../../@common/Typography/Typography.tsx';
import PostPreviewBox from '../../home/PostPreviewBox/PostPreviewBox.tsx';

import useGetMoimAllPosts from 'hooks/queries/FeedHome/useGetMoimAllPosts.ts';
import MoimHappeningEventSkeleton from './skeleton/MoimHappeningEventSkeleton.tsx';

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
    return (
      <View className="flex flex-col">
        <Typography className="text-lg mb-4 text-dark-800" fontWeight={'BOLD'}>
          모임에 무슨일이 일어나고 있나요?
        </Typography>
        <MoimHappeningEventSkeleton />
      </View>
    );
  }

  if (isError) {
    return <View></View>;
  }

  return (
    <View className="flex flex-col">
      {data.length !== 0 ? (
        <>
          <Typography
            className="text-lg mb-4 text-dark-800"
            fontWeight={'BOLD'}>
            모임에 무슨일이 일어나고 있나요?
          </Typography>
          <PostPreviewBox allPosts={data} />
        </>
      ) : null}
    </View>
  );
}
