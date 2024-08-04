import {MyStack} from '../constants';

import MyHomeScreen from 'screens/MyStackScreens/MyHomeScreen.tsx';
import MyDetailProfileScreen from 'screens/MyStackScreens/MyDetailProfileScreen.tsx';
import ProfilesScreen from 'screens/MyStackScreens/ProfilesScreen.tsx';
import MyProfileEditScreen from '../../screens/MyStackScreens/MyProfileEditScreen.tsx';

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
    </MyStack.Navigator>
  );
}
