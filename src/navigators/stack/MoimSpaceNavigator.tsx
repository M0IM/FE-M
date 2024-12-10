import {MoimSpaceStack} from 'navigators/constants';
import UserProfileStackNavigator from './UserProfileStackNavigator';
import MoimTopTabNavigator from 'navigators/tab/MoimTopTabNavigator';
import {HomeStackParamList, MoimStackParamList} from 'navigators/types';
import {RouteProp} from '@react-navigation/native';
import MoimPostStackNavigator from './MoimPostStackNavigator';
import MoimPlanStackNavigator from './MoimPlanStackNavigator';
import MoimManagementStackNavigator from './MoimManagementStackNavigator';

export default function MoimSpaceNavigator({
  route,
}: {
  route:
    | RouteProp<MoimStackParamList, 'MOIM_DETAIL'>
    | RouteProp<HomeStackParamList, 'MOIM_STACK'>;
}) {
  const id = route?.params?.params?.id;
  return (
    <MoimSpaceStack.Navigator initialRouteName="SPACE">
      <MoimSpaceStack.Screen
        name="SPACE"
        initialParams={{screen: 'MOIM_SPACE', params: {id}}}
        component={MoimTopTabNavigator}
        options={{
          headerTitle: '',
          headerTintColor: '#000',
          headerTitleAlign: 'center',
          headerLeftLabelVisible: false,
          headerShadowVisible: false,
        }}
      />
      <MoimSpaceStack.Screen
        name="PROFILE"
        component={UserProfileStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <MoimSpaceStack.Screen
        name="BOARD"
        component={MoimPostStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <MoimSpaceStack.Screen
        name="SCHEDULE"
        component={MoimPlanStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <MoimSpaceStack.Screen
        name="MANAGEMENT"
        component={MoimManagementStackNavigator}
        options={{
          headerShown: false,
        }}
      />
    </MoimSpaceStack.Navigator>
  );
}
