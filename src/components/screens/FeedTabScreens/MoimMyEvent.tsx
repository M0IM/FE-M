import {FlatList, View} from 'react-native';

import {useState} from 'react';

import {Typography} from '../../@common/Typography/Typography.tsx';
import SpaceCard from '../../home/SpaceCard/SpaceCard.tsx';
import {HomeStackNavigationProp} from 'navigators/types/index.ts';
import {useGetInfiniteMyActiveMoim} from 'hooks/queries/MoimHomeScreen/useGetInfiniteMyActiveMoim.ts';

interface MoimMyEventProps {
  navigation: HomeStackNavigationProp;
}

export default function MoimMyEvent({navigation}: MoimMyEventProps) {
  const {
    data: moims,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isPending,
    isError,
  } = useGetInfiniteMyActiveMoim();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  if (isPending || isError) {
    return <></>;
  }

  return (
    <View className="flex flex-col">
      <Typography className="text-lg mb-4" fontWeight={'BOLD'}>
        내 모임
      </Typography>
      <FlatList
        data={moims.pages.flatMap(page => page.moimPreviewList)}
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
        onRefresh={handleRefresh}
        scrollIndicatorInsets={{right: 1}}
        indicatorStyle={'black'}
      />
    </View>
  );
}
