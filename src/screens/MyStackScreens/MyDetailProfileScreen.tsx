import {ActivityIndicator, View} from 'react-native';

import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';
import InfoSquareCard from 'components/me/InfoSquareCard/InfoSquareCard.tsx';
import {ProfileCard} from 'components/@common/ProfileCard/ProfileCard.tsx';

import {MyStackNavigationProp, MyStackRouteProp} from 'navigators/types';
import {useGetDetailProfile} from 'hooks/queries/MyScreen/useGetDetailProfile.ts';
import {getMonthYearDetails} from 'utils';
import useDetailProfileStore from 'stores/useDetailProfileStore.ts';
import {TUserDTO} from 'types/dtos/user.ts';

interface IMyDetailProfileScreenProps {
  route: MyStackRouteProp;
  navigation: MyStackNavigationProp;
}

export default function MyDetailProfileScreen({
  route,
  navigation,
}: IMyDetailProfileScreenProps) {
  const userId = route.params?.id as number;
  const {data: userInfo, isPending, isError} = useGetDetailProfile(userId);
  const {setDetailProfile} = useDetailProfileStore();

  const {year, month, day} = getMonthYearDetails(
    new Date(userInfo?.createdAt as string),
  );

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
    <ScreenContainer
      fixedBottomComponent={
        <CustomButton onPress={handleEditPost} label={'수정하기'} />
      }>
      <View className="px-4 py-2">
        <ProfileCard userInfo={userInfo as TUserDTO} />
        <View className="flex-row justify-between">
          <InfoSquareCard title="가입 날짜">
            <Typography fontWeight={'BOLD'}>{year}년</Typography>
            <Typography fontWeight={'BOLD'}>
              {month}월 {day}일
            </Typography>
          </InfoSquareCard>
          <InfoSquareCard title="모임 평가">
            <Typography fontWeight={'BOLD'}>{userInfo?.rating}</Typography>
          </InfoSquareCard>
          <InfoSquareCard title="가입 모임">
            <Typography fontWeight={'BOLD'}>API없음</Typography>
          </InfoSquareCard>
        </View>
        <View className="mt-5"></View>
        <View className="my-5">
          <Typography className="text-gray-500" fontWeight={'BOLD'}>
            소개
          </Typography>
          <Typography className="mt-5" fontWeight={'BOLD'}>
            {userInfo?.introduction ||
              '아래 수정하기 버튼을 눌러, 소개를 작성해주세요.'}
          </Typography>
        </View>
      </View>
    </ScreenContainer>
  );
}
