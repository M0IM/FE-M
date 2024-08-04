import {MyStack} from '../constants';

import MyHomeScreen from 'screens/MyStackScreens/MyHomeScreen.tsx';
import MyDetailProfileScreen from 'screens/MyStackScreens/MyDetailProfileScreen.tsx';
import ProfilesScreen from 'screens/MyStackScreens/ProfilesScreen.tsx';
import MyProfileEditScreen from 'screens/MyStackScreens/MyProfileEditScreen.tsx';
import RevokeMoimScreen from 'screens/MyStackScreens/RevokeMoimScreen.tsx';
import MyMoimJoinStatusScreen from '../../screens/MyStackScreens/MyMoimJoinStatusScreen.tsx';
import EditMoimInfoScreen from '../../screens/MyStackScreens/EditMoimInfoScreen.tsx';
import EditAlertScreen from '../../screens/MyStackScreens/EditAlertScreen.tsx';
import AppInfoScreen from '../../screens/MyStackScreens/AppInfoScreen.tsx';
import MyPrivacyPolicyScreen from '../../screens/MyStackScreens/MyPrivacyPolicyScreen.tsx';
import MyServiceTermScreen from '../../screens/MyStackScreens/MyServiceTermScreen.tsx';

export default function MyStackNavigator() {
  return (
    <MyStack.Navigator
      initialRouteName={'MY_SETTING_HOME'}
      screenOptions={{
        headerShown: true,
        cardStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: '#000',
        headerBackTitle: ' ',
      }}>
      <MyStack.Screen
        name={'MY_SETTING_HOME'}
        component={MyHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <MyStack.Screen
        name={'MY_MANAGE_PROFILE'}
        component={ProfilesScreen}
        options={{
          headerTitle: '프로필 설정',
        }}
      />
      <MyStack.Screen
        name={'MY_DETAIL_PROFILE'}
        component={MyDetailProfileScreen}
        options={{
          headerTitle: '내 프로필',
        }}
      />
      <MyStack.Screen
        name={'MY_PROFILE_EDIT'}
        component={MyProfileEditScreen}
        options={{
          headerTitle: '프로필 수정',
        }}
      />
      <MyStack.Screen
        name={'MY_REVOKE_MOIM'}
        component={RevokeMoimScreen}
        options={{
          headerTitle: '회원 탈퇴',
        }}
      />
      <MyStack.Screen
        name={'MY_MOIM_JOIN_STATUS'}
        component={MyMoimJoinStatusScreen}
        options={{
          headerTitle: '가입신청 상태 확인',
        }}
      />
      <MyStack.Screen
        name={'MY_EDIT_MOIM_INFO'}
        component={EditMoimInfoScreen}
        options={{
          headerTitle: '모임 정보 수정하기',
        }}
      />
      <MyStack.Screen
        name={'MY_EDIT_ALERT'}
        component={EditAlertScreen}
        options={{
          headerTitle: '알림 설정',
        }}
      />
      <MyStack.Screen
        name={'MY_APP_INFO'}
        component={AppInfoScreen}
        options={{
          headerTitle: '앱 정보',
        }}
      />
      <MyStack.Screen
        name={'MY_PRIVACY_POLICY'}
        component={MyPrivacyPolicyScreen}
        options={{
          headerTitle: '개인정보 처리 방침',
        }}
      />
      <MyStack.Screen
        name={'MY_SERVICE_TERM'}
        component={MyServiceTermScreen}
        options={{
          headerTitle: '서비스 이용 약관',
        }}
      />
      <MyStack.Screen
        name={'MY_PASSWORD_CHANGE'}
        component={MyServiceTermScreen}
        options={{
          headerTitle: '비밀번호 변경',
        }}
      />
    </MyStack.Navigator>
  );
}
