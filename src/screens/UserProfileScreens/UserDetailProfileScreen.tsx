import {ActivityIndicator, SafeAreaView, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {Typography} from 'components/@common/Typography/Typography.tsx';
import {ProfileCard} from 'components/@common/ProfileCard/ProfileCard.tsx';
import InfoSquareCard from 'components/me/InfoSquareCard/InfoSquareCard.tsx';

import {useGetDetailProfile} from 'hooks/queries/MyScreen/useGetDetailProfile.ts';

import {getMonthYearDetails} from 'utils';
import {TUserDTO} from 'types/dtos/user.ts';
import {HomeStackNavigationProp, HomeStackRouteProp} from 'navigators/types';

export default function UserDetailProfileScreen() {
  const route = useRoute<HomeStackRouteProp>();
  const navigation = useNavigation<HomeStackNavigationProp>();
  const userId = route?.params?.id as number;
  const {data: userInfo, isPending, isError} = useGetDetailProfile(userId);

  const {year, month, day} = getMonthYearDetails(
    new Date(userInfo?.createdAt as string),
  );

  if (!userId || !userInfo) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#00F0A1" />
      </View>
    );
  }

  if (isPending || isError) {
    return <></>;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5 py-7">
        <ProfileCard userInfo={userInfo as TUserDTO} />
        <View className="flex-row justify-around mb-3 mt-3">
          <InfoSquareCard title="가입 날짜" disabled>
            <Typography fontWeight={'BOLD'}>{year}년</Typography>
            <Typography fontWeight={'BOLD'}>
              {month}월 {day}일
            </Typography>
          </InfoSquareCard>
          <InfoSquareCard
            title="모임 평가"
            onPress={() =>
              navigation.navigate('USER_DETAIL_PROFILE', {
                screen: 'USER_REVIEW',
                params: {
                  id: userId,
                  userName: userInfo.nickname,
                },
              })
            }>
            <Typography fontWeight={'BOLD'}>
              {userInfo?.rating.toFixed(1)}
            </Typography>
          </InfoSquareCard>
          <InfoSquareCard
            title="가입 모임"
            onPress={() =>
              navigation.navigate('USER_DETAIL_PROFILE', {
                screen: 'USER_PARTICIPANT_MOIM',
                params: {
                  id: userId,
                  userName: userInfo.nickname,
                },
              })
            }>
            <Typography fontWeight={'BOLD'}>
              {userInfo?.participateMoimCnt} 개
            </Typography>
          </InfoSquareCard>
        </View>
      </View>
      <View className="p-2 px-7 mb-2">
        <Typography className="text-xs text-gray-300" fontWeight={'BOLD'}>
          소개
        </Typography>
        <Typography
          numberOfLines={3}
          className="mt-5 text-gray-600 text-sm"
          fontWeight={'BOLD'}>
          {userInfo?.introduction || '아직 소개를 작성하지 않았습니다.'}
        </Typography>
      </View>
    </SafeAreaView>
  );
}
