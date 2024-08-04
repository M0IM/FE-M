import {Image, View} from 'react-native';
import Avatar from '../../@common/Avatar/Avatar.tsx';
import {Typography} from '../../@common/Typography/Typography.tsx';
import InfoSquareCard from '../../me/InfoSquareCard/InfoSquareCard.tsx';

import Group from 'assets/images/Group.png';
import Call from 'assets/images/ion_call.png';
import Bubble from 'assets/images/Speech_Bubble.png';
import {MyStackNavigationProp} from '../../../navigators/types';

interface IMyProfileCard {
  navigation: MyStackNavigationProp;
}

export default function MyProfileCard({navigation}: IMyProfileCard) {
  return (
    <>
      <View className={'flex-row items-center mt-5'}>
        <Avatar size="LG" src={''} alt="Avatar" />
        <Typography fontWeight={'BOLD'}>김용민</Typography>
      </View>
      <View className={'flex-row items-center justify-center gap-x-5'}>
        <InfoSquareCard
          title={'프로필 설정'}
          onPress={() => navigation.navigate('MY_MANAGE_PROFILE')}>
          <Image source={Group} />
        </InfoSquareCard>
        <InfoSquareCard title={'문의 하기'}>
          <Image source={Call} />
        </InfoSquareCard>
        <InfoSquareCard title={'내 후기 확인'}>
          <Image source={Bubble} />
        </InfoSquareCard>
      </View>
    </>
  );
}
