import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import {useState} from 'react';

import {Typography} from 'components/@common/Typography/Typography.tsx';
import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';
import InfoSquareCard from 'components/me/InfoSquareCard/InfoSquareCard.tsx';
import {ProfileCard} from 'components/@common/ProfileCard/ProfileCard.tsx';

import {
  HomeStackNavigationProp,
  MyStackNavigationProp,
  MyStackParamList,
} from 'navigators/types';
import {useGetDetailProfile} from 'hooks/queries/MyScreen/useGetDetailProfile.ts';
import {getMonthYearDetails} from 'utils';
import useDetailProfileStore from 'stores/useDetailProfileStore.ts';
import {TUserDTO} from 'types/dtos/user.ts';

import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';

interface IMyDetailProfileScreenProps {
  route: RouteProp<MyStackParamList, 'MY_DETAIL_PROFILE'>;
  navigation: CompositeNavigationProp<
    MyStackNavigationProp,
    HomeStackNavigationProp
  >;
}

export default function MyDetailProfileScreen({
  route,
  navigation,
}: IMyDetailProfileScreenProps) {
  const userId = route.params?.id;
  const {
    data: userInfo,
    isPending,
    isError,
    refetch,
  } = useGetDetailProfile(userId);
  const {setDetailProfile} = useDetailProfileStore();
  const [refreshing, setRefreshing] = useState(false);
  const {year, month, day} = getMonthYearDetails(
    new Date(userInfo?.createdAt as string),
  );

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  const handleEditPost = () => {
    if (!userInfo) {
      return;
    }
    setDetailProfile(userInfo);
    navigation.navigate('MY_PROFILE_EDIT', {
      id: userId,
    });
  };

  if (isPending || isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#00F0A1" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="flex-1 p-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View className="px-2 py-2 mt-3">
          <ProfileCard userInfo={userInfo as TUserDTO} />
          <View className="flex-row justify-between mt-4">
            <InfoSquareCard title="가입 날짜" disabled>
              <Typography fontWeight={'BOLD'} className="text-gray-600 text-sm">
                {year}년
              </Typography>
              <Typography fontWeight={'BOLD'} className="text-gray-600 text-sm">
                {month}월 {day}일
              </Typography>
            </InfoSquareCard>
            <InfoSquareCard title="유저 평가" disabled>
              <Typography fontWeight={'BOLD'} className="text-gray-600text-sm">
                {userInfo?.rating.toFixed(1)}
              </Typography>
            </InfoSquareCard>
            <InfoSquareCard title="가입 모임">
              <Typography fontWeight={'BOLD'} className="text-gray-600 text-sm">
                {userInfo?.participateMoimCnt} 개
              </Typography>
            </InfoSquareCard>
          </View>
          <View className="mt-5"></View>
          <View className="my-5">
            <Typography className="text-gray-500" fontWeight={'MEDIUM'}>
              소개
            </Typography>
            <Typography
              numberOfLines={3}
              className="mt-5 text-gray-600 text-sm"
              fontWeight={'BOLD'}>
              {userInfo?.introduction ||
                '아래 수정하기 버튼을 눌러, 소개를 작성해주세요.'}
            </Typography>
          </View>
        </View>
      </ScrollView>
      <View className="absolute right-0 left-0 bottom-0 m-5 flex-row items-center justify-center gap-y-2">
        <CustomButton
          onPress={handleEditPost}
          label={'수정하기'}
          textStyle="text-white font-bold text-lg"
        />
      </View>
    </SafeAreaView>
  );
}
