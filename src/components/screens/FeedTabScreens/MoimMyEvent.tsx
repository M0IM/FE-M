import {FlatList, View} from 'react-native';

import {useEffect} from 'react';

import {Typography} from '../../@common/Typography/Typography.tsx';
import SpaceCard from '../../home/SpaceCard/SpaceCard.tsx';
import {HomeStackNavigationProp} from 'navigators/types/index.ts';
import {useGetInfiniteMyActiveMoim} from 'hooks/queries/MoimHomeScreen/useGetInfiniteMyActiveMoim.ts';

interface MoimMyEventProps {
  navigation: HomeStackNavigationProp;
  isRefreshing: boolean;
}

export default function MoimMyEvent({
  navigation,
  isRefreshing,
}: MoimMyEventProps) {
  const {
    data: moims,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchMyActiveMoim,
    isPending,
    isError,
  } = useGetInfiniteMyActiveMoim();

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    const refetch = async () => {
      if (isRefreshing) {
        await refetchMyActiveMoim();
      }
    };
    refetch();
  }, [isRefreshing]);

  if (isPending || isError) {
    return <></>;
  }

  const activeMoim = moims.pages.flatMap(page => page.moimPreviewList);

  return (
    <View className="flex flex-col">
      <Typography className="text-lg mb-4" fontWeight={'BOLD'}>
        내 모임
      </Typography>
      <FlatList
        data={activeMoim}
        renderItem={({item}) => {
          return (
            <SpaceCard
              item={item}
              onPress={() =>
                navigation.navigate('MOIM_STACK', {
                  screen: 'MOIM_SPACE',
                  params: {
                    id: item.moimId,
                  },
                })
              }
            />
          );
        }}
        horizontal={true}
        keyExtractor={item => String(item.moimId)}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        scrollIndicatorInsets={{right: 1}}
        indicatorStyle={'black'}
      />
    </View>
  );
}
