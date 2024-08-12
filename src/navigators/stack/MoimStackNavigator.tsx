import {MoimStack} from '../constants';

import MoimHomeScreen from 'screens/MoimStackScreens/MoimHomeScreen.tsx';
import MoimTopTabNavigator from 'navigators/tab/MoimTopTabNavigator.tsx';
import MoimWriteScreen from 'screens/MoimStackScreens/MoimWriteScreen.tsx';

export default function MoimStackNavigator() {
  return (
    <MoimStack.Navigator
      initialRouteName={'MOIM_LIST'}
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerShown: false,
      }}>
      <MoimStack.Screen name={'MOIM_LIST'} component={MoimHomeScreen} />
      <MoimStack.Screen
        name={'MOIM_WRITE'}
        component={MoimWriteScreen}
        options={{
          headerShown: true,
          headerTitle: '새로운 일정 추가',
          headerTintColor: 'black',
          headerLeftLabelVisible: false,
        }}
      />
      <MoimStack.Screen name={'MOIM_DETAIL'} component={MoimTopTabNavigator} />
    </MoimStack.Navigator>
  );
}
