import {FlatList, SafeAreaView} from 'react-native';

import {Typography} from 'components/@common/Typography/Typography.tsx';
import {useGetInfiniteMyDetailReviews} from 'hooks/queries/MyScreen/useGetInfiniteMyDetailReviews.ts';
import {ReviewCard} from '../../components/screens/MyStackScreens/ReviewCard.tsx';
import {useState} from 'react';

export default function MyReviewScreen() {
  const {
    data: reviews,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteMyDetailReviews();
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

  return (
    <SafeAreaView className="flex-1">
      <Typography fontWeight={'BOLD'} className="p-7 text-xl">
        받은 후기
      </Typography>
      <FlatList
        data={reviews.pages.flat()}
        renderItem={({item}) => {
          return <ReviewCard review={item} />;
        }}
        keyExtractor={item => String(item.reviewId)}
        numColumns={1}
        contentContainerStyle={{
          paddingHorizontal: 30,
          gap: 10,
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
