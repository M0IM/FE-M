import {ScreenContainer} from '../../components/ScreenContainer.tsx';
import MyProfileCard from '../../components/screens/MyStackScreens/MyProfileCard.tsx';
import {SettingItem} from '../../components/@common/SettingItem/SettingItem.tsx';
import {View} from 'react-native';
import {Typography} from '../../components/@common/Typography/Typography.tsx';
import {MyStackNavigationProp} from '../../navigators/types';

interface IMyHomeScreenProps {
  navigation: MyStackNavigationProp;
}

export default function MyHomeScreen({navigation}: IMyHomeScreenProps) {
  return (
    <ScreenContainer>
      <MyProfileCard navigation={navigation} />
      <View className="pt-8">
        <View className="flex-col gap-y-2">
          <Typography className="text-gray-400" fontWeight={'BOLD'}>
            모임
          </Typography>
          <SettingItem title={'모임 탈퇴 신청하기'} />
          <SettingItem title={'가입 신청 상태 확인하기'} />
          <SettingItem title={'모임 정보 수정하기'} />
        </View>
        <View className={'h-7'} />
        <View className="flex-col gap-y-2">
          <Typography className="text-gray-400" fontWeight={'BOLD'}>
            앱 설정
          </Typography>
          <SettingItem title={'알림 설정'} />
          <SettingItem title={'앱 정보'} />
          <SettingItem title={'개인정보 처리 방침'} />
          <SettingItem title={'서비스 이용 약관'} />
        </View>
        <View className={'h-7'} />
        <View className="flex-col gap-y-2">
          <Typography className="text-gray-400" fontWeight={'BOLD'}>
            계정
          </Typography>
          <SettingItem title={'비밀번호 변경'} />
          <SettingItem title={'로그 아웃'} />
          <SettingItem title={'탈퇴하기'} />
          <SettingItem title={'서비스 이용 약관'} />
        </View>
      </View>
    </ScreenContainer>
  );
}
