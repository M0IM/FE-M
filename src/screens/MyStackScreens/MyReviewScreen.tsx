import {FlatList, SafeAreaView, View} from 'react-native';

import {Typography} from 'components/@common/Typography/Typography.tsx';
import {useGetInfiniteMyDetailReviews} from 'hooks/queries/MyScreen/useGetInfiniteMyDetailReviews.ts';
import {ReviewCard} from 'components/screens/MyStackScreens/ReviewCard.tsx';
import {useState} from 'react';
import {MyStackParamList} from 'navigators/types';
import {RouteProp} from '@react-navigation/native';

export default function MyReviewScreen({
  route,
}: {
  route: RouteProp<MyStackParamList, 'MY_REVIEW'>;
}) {
  const id = route.params?.id;
  const {
    data: reviews,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteMyDetailReviews(id);

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
      {reviews.pages.flat().length === 0 ? (
        <View className="flex flex-col justify-center items-center h-[60%]">
          <Typography fontWeight="LIGHT" className="text-gray-600 text-base">
            아직 받은 후기가 없습니다.
          </Typography>
        </View>
      ) : (
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
      )}
    </SafeAreaView>
  );
}
