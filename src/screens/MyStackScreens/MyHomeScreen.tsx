import {Alert, RefreshControl, View} from 'react-native';
import {useState} from 'react';

import {ScreenContainer} from 'components/ScreenContainer.tsx';
import MyProfileCard from 'components/screens/MyStackScreens/MyProfileCard.tsx';
import {SettingItem} from 'components/@common/SettingItem/SettingItem.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';

import {MyStackNavigationProp} from 'navigators/types';
import useAuth from 'hooks/queries/AuthScreen/useAuth.ts';
import {useGetMyProfile} from 'hooks/queries/MyScreen/useGetProfile.ts';

interface IMyHomeScreenProps {
  navigation: MyStackNavigationProp;
}

export default function MyHomeScreen({navigation}: IMyHomeScreenProps) {
  const {data: profile, refetch} = useGetMyProfile();
  const {logoutMutation, deleteUserMutation} = useAuth();
  const [refresh, setRefresh] = useState(false);
  const handlePressLogout = () => {
    logoutMutation.mutate(null);
  };

  const onRefresh = () => {
    setRefresh(true);
    refetch();
    setRefresh(false);
  };

  const hanldeDeleteUser = () => {
    Alert.alert(
      '정말 해당 서비스를 탈퇴하시겠습니까?',
      '가입된 모임의 모임장인 경우, 권한 위임을 하셔야 탈퇴하실 수 있습니다.',
      [
        {
          text: '탈퇴하기',
          style: 'destructive',
          onPress: () => {
            deleteUserMutation.mutate(null);
          },
        },
        {
          text: '취소하기',
          style: 'default',
        },
      ],
    );
  };

  return (
    <ScreenContainer
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
      }>
      <MyProfileCard navigation={navigation} profile={profile} />
      <View className="pt-5">
        <View className="flex-col gap-y-2 px-2">
          <Typography className="text-gray-400" fontWeight={'MEDIUM'}>
            모임
          </Typography>
          <SettingItem
            title={'모임 탈퇴 신청하기'}
            onPress={() => {
              navigation.navigate('MY_REVOKE_MOIM');
            }}
          />
          <SettingItem
            title={'가입 신청 상태 확인하기'}
            onPress={() => navigation.navigate('MY_MOIM_JOIN_STATUS')}
          />
          <SettingItem
            title={'내가 할당한 할 일 확인'}
            onPress={() =>
              navigation.navigate('TODO_ASSIGNMENT_LIST', {
                screen: 'GET_TODO',
              })
            }
          />
          {/* <SettingItem
            title={'모임 정보 수정하기'}
            onPress={() => navigation.navigate('MY_EDIT_MOIM_INFO')}
          /> */}
        </View>
        <View className={'h-7'} />
        <View className="flex-col gap-y-2 px-2">
          <Typography className="text-gray-400" fontWeight={'MEDIUM'}>
            앱 설정
          </Typography>
          <SettingItem
            title={'알림 설정'}
            onPress={() => navigation.navigate('MY_EDIT_ALERT')}
          />
          {/* <SettingItem
            title={'앱 정보'}
            onPress={() => navigation.navigate('MY_APP_INFO')}
          /> */}
          <SettingItem
            title={'개인정보 처리방침'}
            onPress={() => navigation.navigate('MY_PRIVACY_POLICY')}
          />
          <SettingItem
            title={'서비스 이용약관'}
            onPress={() => navigation.navigate('MY_SERVICE_TERM')}
          />
        </View>
        <View className={'h-7'} />
        <View className="flex-col gap-y-2 px-2">
          <Typography className="text-gray-400" fontWeight={'MEDIUM'}>
            계정
          </Typography>
          {profile?.result.provider === 'LOCAL' && (
            <SettingItem
              title={'비밀번호 변경'}
              onPress={() => navigation.navigate('MY_PASSWORD_CHANGE')}
            />
          )}
          <SettingItem title={'로그아웃'} onPress={handlePressLogout} />
          <SettingItem title={'탈퇴하기'} onPress={hanldeDeleteUser} />
        </View>
      </View>
    </ScreenContainer>
  );
}
