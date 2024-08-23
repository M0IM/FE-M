import {useState} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';

import {Typography} from 'components/@common/Typography/Typography.tsx';
import {ActiveMoimCard} from 'components/calendar/ActiveMoimCard.tsx';

import {HomeStackNavigationProp} from 'navigators/types';
import {useGetInfiniteMyActiveMoim} from 'hooks/queries/MoimHomeScreen/useGetInfiniteMyActiveMoim.ts';

interface IMoimHomeScreenProps {
  navigation: HomeStackNavigationProp;
}

export default function MoimHomeScreen({navigation}: IMoimHomeScreenProps) {
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
    <SafeAreaView className="flex-1">
      <View className="flex-row p-5 gap-x-3 mt-5 items-center">
        <Typography className="text-xl" fontWeight={'BOLD'}>
          내가 활동 중인 모임
        </Typography>
      </View>
      <FlatList
        data={moims.pages.flatMap(page => page.moimPreviewList)}
        renderItem={({item}) => {
          return (
            <ActiveMoimCard
              onPress={() =>
                navigation.navigate('MOIM_STACK', {
                  screen: 'MOIM_SPACE',
                  params: {
                    id: item.moimId,
                  },
                })
              }
              moim={item}
            />
          );
        }}
        keyExtractor={item => String(item.moimId)}
        numColumns={1}
        contentContainerStyle={{paddingHorizontal: 30, gap: 10}}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        scrollIndicatorInsets={{right: 1}}
        indicatorStyle={'black'}
      />
    </SafeAreaView>
  );
}
