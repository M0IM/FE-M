import {View} from 'react-native';

import {ScreenContainer} from 'components/ScreenContainer.tsx';
import MyProfileCard from 'components/screens/MyStackScreens/MyProfileCard.tsx';
import {SettingItem} from 'components/@common/SettingItem/SettingItem.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';

import {MyStackNavigationProp} from 'navigators/types';
import useAuth from 'hooks/queries/AuthScreen/useAuth.ts';

interface IMyHomeScreenProps {
  navigation: MyStackNavigationProp;
}

export default function MyHomeScreen({navigation}: IMyHomeScreenProps) {
  const {logoutMutation} = useAuth();
  const handlePressLogout = () => {
    logoutMutation.mutate(null);
  };
  return (
    <ScreenContainer>
      <MyProfileCard navigation={navigation} />
      <View className="pt-8">
        <View className="flex-col gap-y-2">
          <Typography className="text-gray-400" fontWeight={'BOLD'}>
            모임
          </Typography>
          <SettingItem
            title={'모임 탈퇴 신청하기'}
            onPress={() => navigation.navigate('MY_REVOKE_MOIM')}
          />
          <SettingItem
            title={'가입 신청 상태 확인하기'}
            onPress={() => navigation.navigate('MY_MOIM_JOIN_STATUS')}
          />
          <SettingItem
            title={'모임 정보 수정하기'}
            onPress={() => navigation.navigate('MY_EDIT_MOIM_INFO')}
          />
        </View>
        <View className={'h-7'} />
        <View className="flex-col gap-y-2">
          <Typography className="text-gray-400" fontWeight={'BOLD'}>
            앱 설정
          </Typography>
          <SettingItem
            title={'알림 설정'}
            onPress={() => navigation.navigate('MY_EDIT_ALERT')}
          />
          <SettingItem
            title={'앱 정보'}
            onPress={() => navigation.navigate('MY_APP_INFO')}
          />
          <SettingItem
            title={'개인정보 처리 방침'}
            onPress={() => navigation.navigate('MY_PRIVACY_POLICY')}
          />
          <SettingItem
            title={'서비스 이용 약관'}
            onPress={() => navigation.navigate('MY_SERVICE_TERM')}
          />
        </View>
        <View className={'h-7'} />
        <View className="flex-col gap-y-2">
          <Typography className="text-gray-400" fontWeight={'BOLD'}>
            계정
          </Typography>
          <SettingItem
            title={'비밀번호 변경'}
            onPress={() => navigation.navigate('MY_PASSWORD_CHANGE')}
          />
          <SettingItem title={'로그 아웃'} onPress={handlePressLogout} />
          <SettingItem title={'탈퇴하기'} />
        </View>
      </View>
    </ScreenContainer>
  );
}
