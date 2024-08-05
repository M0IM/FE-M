import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CustomTabBar from 'components/@common/CustomTabBar/CustomTabBar';
import MoimPlanStackNavigator from 'navigators/stack/MoimPlanStackNavigator';
import MoimPostStackNavigator from 'navigators/stack/MoimPostStackNavigator';
import {MoimTopTabParamList} from 'navigators/types';
import MoimDetailScreen from 'screens/MoimStackScreens/MoimDetailScreen';

const Tab = createMaterialTopTabNavigator<MoimTopTabParamList>();

export default function MoimTopTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={'MOIM_SPACE'}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name={'MOIM_SPACE'}
        component={MoimDetailScreen}
        options={{
          tabBarLabel: '모임 홈',
        }}
      />
      <Tab.Screen
        name={'MOIM_PLAN'}
        component={MoimPlanStackNavigator}
        options={{
          tabBarLabel: '일정',
        }}
      />
      <Tab.Screen
        name={'MOIM_BOARD'}
        component={MoimPostStackNavigator}
        options={{
          tabBarLabel: '게시판',
        }}
      />
    </Tab.Navigator>
  );
}
