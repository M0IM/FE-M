import {useEffect, useRef} from 'react';
import {ActivityIndicator, Animated, SafeAreaView, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import {Typography} from 'components/@common/Typography/Typography.tsx';
import {ProfileCard} from 'components/@common/ProfileCard/ProfileCard.tsx';
import InfoSquareCard from 'components/me/InfoSquareCard/InfoSquareCard.tsx';

import {useGetDetailProfile} from 'hooks/queries/MyScreen/useGetDetailProfile.ts';

import {getMonthYearDetails} from 'utils';
import {TUserDTO} from 'types/dtos/user.ts';
import {
  HomeStackNavigationProp,
  UserProfileStackParamList,
} from 'navigators/types';

export default function UserDetailProfileScreen() {
  const route =
    useRoute<RouteProp<UserProfileStackParamList, 'USER_PROFILE'>>();
  const navigation = useNavigation<HomeStackNavigationProp>();
  const params = route?.params;
  const userId = params.id;

  const {data: userInfo, isPending, isError} = useGetDetailProfile(userId);

  const {year, month, day} = getMonthYearDetails(
    new Date(userInfo?.createdAt as string),
  );

  const floatAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startFloating = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnimation, {
            toValue: -10,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    startFloating();
  }, [floatAnimation]);

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
          <View className="relative">
            <InfoSquareCard
              title="유저 후기"
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
                {userInfo?.rating.toFixed(1)} 점
              </Typography>
            </InfoSquareCard>
            <Animated.View
              className="absolute p-[6px] top-[-8px] right-[-10px] rounded-lg bg-green-400"
              style={{transform: [{translateY: floatAnimation}]}}>
              <Typography fontWeight="BOLD" className="text-white text-xs">
                Press Me !
              </Typography>
            </Animated.View>
          </View>
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
