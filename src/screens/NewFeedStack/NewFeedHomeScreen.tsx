import {FlatList, SafeAreaView, TouchableOpacity, View} from 'react-native';

import {Typography} from 'components/@common/Typography/Typography.tsx';
import {useState} from 'react';
import useGetInfinityMoimIntroducePosts from '../../hooks/queries/NewFeedHomeScreen/useGetInfinityMoimIntroducePosts.ts';

import {NewFeedHomeNavigationProp} from '../../navigators/types';
import {NewFeedCard} from '../../components/screens/NewFeedHomeScreen/NewFeedCard.tsx';

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
    return <Typography fontWeight="MEDIUM">로딩 중</Typography>;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-8 flex-1">
        <Typography className="text-xl" fontWeight={'BOLD'}>
          실시간 모임
        </Typography>
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
      </View>
    </SafeAreaView>
  );
}

export default NewFeedHomeScreen;
