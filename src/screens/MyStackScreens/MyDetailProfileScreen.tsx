import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {MyStackNavigationProp, MyStackRouteProp} from '../../navigators/types';
import Avatar from 'components/@common/Avatar/Avatar.tsx';
import {useGetDetailProfile} from '../../hooks/queries/MyScreen/useGetDetailProfile.ts';
import {View} from 'react-native';
import {Typography} from '../../components/@common/Typography/Typography.tsx';
import {CustomButton} from '../../components/@common/CustomButton/CustomButton.tsx';
import {useState} from 'react';
import Badge from '@react-navigation/bottom-tabs/lib/typescript/src/views/Badge';
import InfoSquareCard from '../../components/me/InfoSquareCard/InfoSquareCard.tsx';
import {getMonthYearDetails} from '../../utils';
import useDetailProfileStore from '../../stores/useDetailProfileStore.ts';

interface IMyDetailProfileScreenProps {
  route: MyStackRouteProp;
  navigation: MyStackNavigationProp;
}

export default function MyDetailProfileScreen({
  route,
  navigation,
}: IMyDetailProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const userId = route.params?.id as number;
  const {data: userInfo, isPending, isError} = useGetDetailProfile(userId);
  const {setDetailProfile} = useDetailProfileStore();
  if (!userInfo) return;

  const {
    birth,
    createdAt,
    imageUrl,
    introduction,
    nickname,
    rating,
    residence,
  } = userInfo;

  const {year, month, day} = getMonthYearDetails(new Date(createdAt));

  const handleEditPost = () => {
    if (!userInfo) {
      return;
    }
    setDetailProfile(userInfo);
    navigation.navigate('MY_PROFILE_EDIT', {
      id: userId,
    });
  };

  return (
    <ScreenContainer
      loading={isPending}
      fixedBottomComponent={
        <CustomButton onPress={handleEditPost} label={'수정하기'} />
      }>
      <View className="px-4 py-2">
        <View className="flex flex-row items-center gap-x-2">
          <Avatar size={'LG'} source={{uri: imageUrl || ''}} />
          <View className="flex-col gap-y-2">
            <Typography
              numberOfLines={1}
              fontWeight={'BOLD'}
              className="text-lg">
              {nickname}
            </Typography>
            <View className="w-full flex flex-row items-center gap-x-2">
              <Typography
                numberOfLines={1}
                fontWeight={'MEDIUM'}
                className="text-gray-500">
                {residence}
              </Typography>
              <Typography
                numberOfLines={1}
                fontWeight={'MEDIUM'}
                className="text-gray-500">
                {birth}
              </Typography>
            </View>
          </View>
        </View>
        <View className="flex-row justify-between">
          <InfoSquareCard title="가입 날짜">
            <Typography fontWeight={'BOLD'}>{year}년</Typography>
            <Typography fontWeight={'BOLD'}>
              {month}월 {day}일
            </Typography>
          </InfoSquareCard>
          <InfoSquareCard title="모임 평가">
            <Typography fontWeight={'BOLD'}>{rating}</Typography>
          </InfoSquareCard>
          <InfoSquareCard title="가입 모임">
            <Typography fontWeight={'BOLD'}>API없음</Typography>
          </InfoSquareCard>
        </View>
        <View className="mt-5">
          <Typography className="text-gray-500" fontWeight={'BOLD'}>
            받은 후기
          </Typography>
        </View>
        <View className="mt-5">
          <Typography className="text-gray-500" fontWeight={'BOLD'}>
            소개
          </Typography>
          <Typography className="mt-5" fontWeight={'BOLD'}>
            {introduction || '아래 수정하기 버튼을 눌러, 소개를 작성해주세요.'}
          </Typography>
        </View>
      </View>
    </ScreenContainer>
  );
}
