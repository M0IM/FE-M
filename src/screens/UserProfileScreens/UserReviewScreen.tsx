import {useState} from 'react';
import {View, SafeAreaView, FlatList} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {Typography} from 'components/@common/Typography/Typography';
import {ReviewCard} from 'components/screens/MyStackScreens/ReviewCard';
import {useGetInfiniteMyDetailReviews} from 'hooks/queries/MyScreen/useGetInfiniteMyDetailReviews';
import {UserProfileStackRouteProp} from 'navigators/types';

const UserReviewScreen = () => {
  const route = useRoute<UserProfileStackRouteProp>();
  const userId = route.params.id;
  const {
    data: reviews,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteMyDetailReviews(userId);

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
    <SafeAreaView className="flex-1 bg-white">
      {reviews.pages.flat().length === 0 ? (
        <View className="flex-col mt-6 items-center justify-center">
          <Typography className="text-gray-500" fontWeight={'MEDIUM'}>
            해당 유저의 리뷰가 존재하지 않습니다.
          </Typography>
        </View>
      ) : (
        <FlatList
          data={reviews.pages.flat().reverse()}
          renderItem={({item}) => {
            return <ReviewCard review={item} />;
          }}
          keyExtractor={item => String(item.reviewId)}
          numColumns={1}
          contentContainerStyle={{
            paddingHorizontal: 30,
            gap: 10,
            marginTop: 30,
            paddingBottom: 30,
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
};

export default UserReviewScreen;
