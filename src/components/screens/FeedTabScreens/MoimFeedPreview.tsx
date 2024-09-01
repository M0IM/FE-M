import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';

import {Typography} from 'components/@common/Typography/Typography';
import useGetInfinityMoimIntroducePosts from 'hooks/queries/NewFeedHomeScreen/useGetInfinityMoimIntroducePosts';

import {TMoimPreviewListDTO} from 'types/dtos/moim';
import Card from './Card';

interface MoimFeedPreviewProps {
  isRefreshing: boolean;
}

const MoimFeedPreview = ({isRefreshing}: MoimFeedPreviewProps) => {
  const {
    data,
    refetch: refetchMoimIntroducePosts,
    isPending,
  } = useGetInfinityMoimIntroducePosts(5);
  const [newFeedData, setNewFeedData] = useState<TMoimPreviewListDTO[]>();

  useEffect(() => {
    const refetch = async () => {
      if (isRefreshing) {
        await refetchMoimIntroducePosts();
      }
    };
    refetch();
  }, [isRefreshing]);

  useEffect(() => {
    if (data?.pages[0]) {
      setNewFeedData(data.pages[0].moimPreviewList);
    }
  }, [data]);

  if (isPending) {
    return <Typography fontWeight="MEDIUM">로딩 중</Typography>;
  }

  return (
    <View className="flex flex-col gap-y-3">
      <Typography className="text-lg mb-2 text-dark-800" fontWeight={'BOLD'}>
        여러 모임을 둘러보세요
      </Typography>
      <FlatList
        scrollEnabled={false}
        numColumns={2}
        columnWrapperStyle={{
          flex: 1,
          justifyContent: 'space-around',
          gap: 10,
        }}
        data={newFeedData}
        renderItem={({item}) => <Card item={item} />}
        ItemSeparatorComponent={() => <View className="h-3" />}
      />
    </View>
  );
};

export default MoimFeedPreview;
