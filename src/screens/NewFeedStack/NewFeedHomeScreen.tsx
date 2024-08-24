import {FlatList, SafeAreaView} from 'react-native';
import {useState} from 'react';

import {NewFeedCard} from 'components/screens/NewFeedHomeScreen/NewFeedCard.tsx';
import {NewFeedCardSkeleton} from 'components/screens/NewFeedHomeScreen/skeleton/NewFeedCardSkeleton.tsx';

import useGetInfinityMoimIntroducePosts from 'hooks/queries/NewFeedHomeScreen/useGetInfinityMoimIntroducePosts.ts';
import {NewFeedHomeNavigationProp} from 'navigators/types';

interface INewFeedHomeScreenProps {
  navigation: NewFeedHomeNavigationProp;
}

function NewFeedHomeScreen({navigation}: INewFeedHomeScreenProps) {
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
                navigation.navigate('NEW_FEED_DETAIL', {
                  id: item.moimPostId,
                })
              }
            />
          );
        }}
        contentContainerStyle={{
          justifyContent: 'center',
          gap: 10,
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
