import {View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons.js';

import Avatar from '../../@common/Avatar/Avatar.tsx';
import {Typography} from '../../@common/Typography/Typography.tsx';
import InfoSquareCard from '../../me/InfoSquareCard/InfoSquareCard.tsx';

import {MyStackNavigationProp} from 'navigators/types';
import {TMyProfileResponse} from 'types/dtos/user.ts';

interface IMyProfileCard {
  navigation: MyStackNavigationProp;
  profile?: TMyProfileResponse;
}

export default function MyProfileCard({navigation, profile}: IMyProfileCard) {
  return (
    <>
      <View className={'flex-row items-center mt-7 pl-2 mb-2'}>
        <Avatar
          size="LG"
          uri={profile?.result.imageUrl}
          alt="Avatar"
          disabled
        />
        <Typography
          numberOfLines={1}
          fontWeight={'BOLD'}
          className="ml-4 text-xl text-dark-800 w-[200]">
          {profile?.result.nickname}
        </Typography>
      </View>
      <View className={'flex-row items-center justify-center gap-x-5'}>
        <InfoSquareCard
          title={'프로필 수정'}
          onPress={() =>
            navigation.navigate('MY_DETAIL_PROFILE', {
              id: profile?.result.userId as number,
            })
          }>
          <Ionicons name="person" size={30} color="#CBFAC4" />
        </InfoSquareCard>
        <InfoSquareCard
          title={'문의 하기'}
          onPress={() => navigation.navigate('MY_CONTACT')}>
          <Ionicons name="call" size={30} color="#84DE77" />
        </InfoSquareCard>
        <InfoSquareCard
          title={'내 후기'}
          onPress={() =>
            navigation.navigate('MY_REVIEW', {
              id: profile?.result.userId as number,
            })
          }>
          <Ionicons name="chatbubble" size={30} color="#E3FCBF" />
        </InfoSquareCard>
      </View>
    </>
  );
}
