import {MoimSpaceStack} from 'navigators/constants';
import UserProfileStackNavigator from './UserProfileStackNavigator';
import MoimTopTabNavigator from 'navigators/tab/MoimTopTabNavigator';
import {HomeStackParamList, MoimStackParamList} from 'navigators/types';
import {RouteProp} from '@react-navigation/native';
import MoimPostStackNavigator from './MoimPostStackNavigator';
import MoimPlanStackNavigator from './MoimPlanStackNavigator';

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
        initialParams={{screen: 'MOIM_SPACE', params: {id}}}
        component={MoimTopTabNavigator}
      />
      <MoimSpaceStack.Screen
        name="PROFILE"
        component={UserProfileStackNavigator}
      />
      <MoimSpaceStack.Screen name="BOARD" component={MoimPostStackNavigator} />
      <MoimSpaceStack.Screen
        name="SCHEDULE"
        component={MoimPlanStackNavigator}
      />
    </MoimSpaceStack.Navigator>
  );
}
