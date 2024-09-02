import {ActivityIndicator, FlatList, SafeAreaView, View} from 'react-native';
import {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import {
  HomeStackNavigationProp,
  UserProfileStackRouteProp,
} from 'navigators/types';
import {useInfiniteGetMembersActiveMoimList} from '../../hooks/queries/MyScreen/useInfiniteGetMembersActiveMoimList.ts';
import {ActiveMoimCard} from '../../components/calendar/ActiveMoimCard.tsx';

export default function UserParticipantMoimScreen() {
  const route = useRoute<UserProfileStackRouteProp>();
  const navigation = useNavigation<HomeStackNavigationProp>();
  const userId = route?.params?.id as number;
  const {
    data: moims,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isPending,
    isError,
  } = useInfiniteGetMembersActiveMoimList(userId, 7);

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

  if (isPending) {
    return (
      <View className="flex-col items-center justify-center h-[300]">
        <ActivityIndicator size="large" color={'#00F0A1'} />
      </View>
    );
  }

  if (isError) {
    return <View></View>;
  }

  const moimList = moims.pages.flatMap(page => page.moimPreviewList);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={moimList}
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
        contentContainerStyle={{
          paddingHorizontal: 30,
        }}
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
