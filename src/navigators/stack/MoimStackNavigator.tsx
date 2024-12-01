import {MoimStack} from '../constants';

import MoimHomeScreen from 'screens/MoimStackScreens/MoimHomeScreen.tsx';
import MoimWriteScreen from 'screens/MoimStackScreens/MoimWriteScreen.tsx';
import MoimSpaceNavigator from './MoimSpaceNavigator';

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
      <MoimStack.Screen name={'MOIM_WRITE'} component={MoimWriteScreen} />
      <MoimStack.Screen name="MOIM_DETAIL">
        {({route}) => <MoimSpaceNavigator route={route} />}
      </MoimStack.Screen>
    </MoimStack.Navigator>
  );
}
