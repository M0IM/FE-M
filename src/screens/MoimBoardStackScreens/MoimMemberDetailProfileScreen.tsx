import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  View,
} from 'react-native';
import {useState} from 'react';

import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import {ProfileCard} from 'components/@common/ProfileCard/ProfileCard.tsx';
import InfoSquareCard from 'components/me/InfoSquareCard/InfoSquareCard.tsx';
import {ReviewCard} from 'components/screens/MyStackScreens/ReviewCard.tsx';

import {useGetInfiniteMyDetailReviews} from 'hooks/queries/MyScreen/useGetInfiniteMyDetailReviews.ts';
import {useGetDetailProfile} from 'hooks/queries/MyScreen/useGetDetailProfile.ts';
import {useGetMyProfile} from 'hooks/queries/MyScreen/useGetProfile.ts';

import {
  MoimPostStackNavigationProp,
  MoimPostStackRouteProp,
} from 'navigators/types';
import {getMonthYearDetails} from 'utils';
import {TUserDTO} from 'types/dtos/user.ts';

const deviceHeight = Dimensions.get('screen').height;

export default function MoimMemberDetailProfileScreen({
  route,
  navigation,
}: {
  route: MoimPostStackRouteProp;
  navigation: MoimPostStackNavigationProp;
}) {
  const userId = route.params.id as number;
  const {data: me} = useGetMyProfile();
  const {data: userInfo, isPending, isError} = useGetDetailProfile(userId);

  const {
    data: reviews,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteMyDetailReviews(userId);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {year, month, day} = getMonthYearDetails(
    new Date(userInfo?.createdAt as string),
  );

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

  console.log(userInfo, 'hihihi');

  if (!userId || !userInfo) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#00F0A1" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5 py-3">
        <ProfileCard userInfo={userInfo as TUserDTO} />
        <View className="flex-row justify-around">
          <InfoSquareCard title="가입 날짜">
            <Typography fontWeight={'BOLD'}>{year}년</Typography>
            <Typography fontWeight={'BOLD'}>
              {month}월 {day}일
            </Typography>
          </InfoSquareCard>
          <InfoSquareCard title="모임 평가">
            <Typography fontWeight={'BOLD'}>
              {userInfo?.rating.toFixed(1)}
            </Typography>
          </InfoSquareCard>
          <InfoSquareCard
            title="가입 모임"
            onPress={() =>
              navigation.navigate('MOIM_JOIN_LIST', {
                id: userId,
                userName: userInfo?.nickname as string,
              })
            }>
            <Typography fontWeight={'BOLD'}>
              {userInfo?.participateMoimCnt} 개
            </Typography>
          </InfoSquareCard>
        </View>
      </View>
      <Typography
        className="p-2 px-7 text-xs text-gray-300"
        fontWeight={'BOLD'}>
        유저 리뷰
      </Typography>
      {/*<TouchableOpacity>*/}
      {/*  <Typography className="text-gray-500" fontWeight={'BOLD'}>*/}
      {/*    자세히 보기*/}
      {/*  </Typography>*/}
      {/*  <View className="border-b-0.5 border-b-gray-400" />*/}
      {/*</TouchableOpacity>*/}
      {reviews.pages.flat().length === 0 ? (
        <View className="flex-col gap-y-2 items-center justify-center">
          <Typography className="text-gray-500" fontWeight={'BOLD'}>
            해당 유저의 리뷰가 존재하지 않습니다.
          </Typography>
          <Typography className="text-gray-500" fontWeight={'BOLD'}>
            아래 후기 작성 버튼을 클릭하여 리뷰를 남겨주세요!
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
          }}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          scrollIndicatorInsets={{right: 1}}
          indicatorStyle={'black'}
        />
      )}
      <View style={{height: deviceHeight * 0.085}} />
      {me?.result.userId === userId ? null : (
        <View className="absolute right-0 left-0 bottom-3 mx-3 flex-row items-center justify-center">
          <CustomButton
            textStyle={'text-lg font-bold color-white'}
            onPress={() =>
              navigation.navigate('MOIM_POST_REVIEW', {
                id: userInfo?.userId as number,
                userName: userInfo?.nickname
                  ? `${userInfo?.nickname} 후기 작성`
                  : '후기 작성',
              })
            }
            label={'후기 작성하기'}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
