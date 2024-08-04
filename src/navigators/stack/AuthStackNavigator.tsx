import LoginScreen from 'screens/AuthStackScreens/LoginScreen.tsx';
import SignUpFunnelScreen from 'screens/AuthStackScreens/SignUpFunnelScreen.tsx';
import PrivacyPolicyScreen from 'screens/AuthStackScreens/PrivacyPolicyScreen.tsx';
import ServiceTermScreen from 'screens/AuthStackScreens/ServiceTermScreen.tsx';

import {AuthStack} from 'navigators/constants';

export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <AuthStack.Screen name={'AUTH_HOME'} component={SignUpFunnelScreen} />
      <AuthStack.Screen
        options={{
          headerShown: true,
          headerTitle: '로그인',
          headerBackTitleVisible: false,
          headerTintColor: '#1D2002',
        }}
        name={'LOGIN'}
        component={LoginScreen}
      />
      <AuthStack.Screen
        name={'SERVICE_TERM'}
        component={ServiceTermScreen}
        options={{
          headerShown: true,
          headerTitle: '서비스 이용 약관',
          headerTintColor: '#000000',
          headerBackTitleVisible: false,
        }}
      />
      <AuthStack.Screen
        name={'PRIVACY_POLICY'}
        component={PrivacyPolicyScreen}
        options={{
          headerShown: true,
          headerTitle: '개인 정보 처리 방침',
          headerTintColor: '#000000',
          headerBackTitleVisible: false,
        }}
      />
    </AuthStack.Navigator>
  );
}
