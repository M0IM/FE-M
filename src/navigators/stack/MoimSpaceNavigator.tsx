import {MoimSpaceStack} from 'navigators/constants';
import UserProfileStackNavigator from './UserProfileStackNavigator';
import MoimTopTabNavigator from 'navigators/tab/MoimTopTabNavigator';
import {HomeStackParamList, MoimStackParamList} from 'navigators/types';
import {RouteProp} from '@react-navigation/native';

export default function MoimSpaceNavigator({
  route,
}: {
  route:
    | RouteProp<MoimStackParamList, 'MOIM_DETAIL'>
    | RouteProp<HomeStackParamList, 'MOIM_STACK'>;
}) {
  const id = route?.params?.params?.id;
  return (
    <MoimSpaceStack.Navigator
      initialRouteName="SPACE"
      screenOptions={{headerShown: false}}>
      <MoimSpaceStack.Screen
        name="SPACE"
        initialParams={{id}}
        component={MoimTopTabNavigator}
      />
      <MoimSpaceStack.Screen
        name="USER_PROFILE"
        component={UserProfileStackNavigator}
      />
    </MoimSpaceStack.Navigator>
  );
}
