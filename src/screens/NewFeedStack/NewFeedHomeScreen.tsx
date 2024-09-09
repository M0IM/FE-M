import {FlatList, SafeAreaView, View} from 'react-native';
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
import {Logo} from '../../components/@common/Logo/Logo.tsx';
import {Typography} from '../../components/@common/Typography/Typography.tsx';
import {CustomButton} from '../../components/@common/CustomButton/CustomButton.tsx';

interface INewFeedHomeScreenProps {
  navigation: CompositeNavigationProp<
    NewFeedHomeNavigationProp,
    HomeStackNavigationProp
  >;
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

  if (isError) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-col p-20 gap-5 mt-5 items-center justify-center">
          <Logo background={'TRANSPARENT'} size={'LG'} />
          <Typography className="text-md text-gray-500" fontWeight={'BOLD'}>
            에러가 발생했습니다.
          </Typography>
        </View>
      </SafeAreaView>
    );
  }

  const moimPreviewList = randomPosts?.pages.flatMap(
    page => page.moimPreviewList,
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {moimPreviewList.length !== 0 ? (
        <FlatList
          data={moimPreviewList}
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
      ) : (
        <View className="flex-col p-20 gap-5 mt-5 items-center justify-center">
          <Logo background={'TRANSPARENT'} size={'LG'} />
          <Typography className="text-md text-gray-500" fontWeight={'BOLD'}>
            현재 생성 된 모임이 없습니다.
          </Typography>
          <Typography fontWeight="BOLD" className="text-gray-400">
            새로운 모임을 개설해보세요!
          </Typography>
          <CustomButton
            label={'모임 생성하기'}
            textStyle={'text-white font-bold text-lg'}
            onPress={() => navigation.navigate('MOIM_CREATE')}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

export default NewFeedHomeScreen;
