import {FlatList, SafeAreaView} from 'react-native';
import {useState} from 'react';

import {NewFeedCard} from 'components/screens/NewFeedHomeScreen/NewFeedCard.tsx';
import {NewFeedCardSkeleton} from 'components/screens/NewFeedHomeScreen/skeleton/NewFeedCardSkeleton.tsx';

import useGetInfinityMoimIntroducePosts from 'hooks/queries/NewFeedHomeScreen/useGetInfinityMoimIntroducePosts.ts';
import {
  HomeStackNavigationProp,
  NewFeedHomeNavigationProp,
  NewFeedHomeRouteProp,
} from 'navigators/types';
import {CompositeNavigationProp} from '@react-navigation/native';

interface INewFeedHomeScreenProps {
  navigation: CompositeNavigationProp<
    NewFeedHomeNavigationProp,
    HomeStackNavigationProp
  >;
  route: NewFeedHomeRouteProp;
}

function NewFeedHomeScreen({navigation, route}: INewFeedHomeScreenProps) {
  const {
    data: randomPosts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isPending,
    isError,
  } = useGetInfinityMoimIntroducePosts(3);
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
      <SafeAreaView className="flex-1 bg-white">
        {Array(2)
          .fill(null)
          .map((_, index) => {
            return <NewFeedCardSkeleton key={index} />;
          })}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={randomPosts?.pages.flatMap(page => page.moimPreviewList)}
        renderItem={({item}) => {
          return (
            <NewFeedCard
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
        contentContainerStyle={{
          justifyContent: 'center',
          gap: 15,
          padding: 20,
        }}
        keyExtractor={item => String(item.moimPostId)}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        scrollIndicatorInsets={{right: 1}}
      />
    </SafeAreaView>
  );
}

export default NewFeedHomeScreen;
