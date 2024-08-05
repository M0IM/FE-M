import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CustomTabBar from 'components/@common/CustomTabBar/CustomTabBar';
import {MoimTopTabParamList} from 'navigators/types';
import MoimBoardScreen from 'screens/MoimBoardStackScreens/MoimBoardScreen';
import MoimPlanHomeScreen from 'screens/MoimCalenderStackScreens/MoimPlanHomeScreen';
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
        component={MoimPlanHomeScreen}
        options={{
          tabBarLabel: '일정',
        }}
      />
      <Tab.Screen
        name={'MOIM_BOARD'}
        component={MoimBoardScreen}
        options={{
          tabBarLabel: '게시판',
        }}
      />
    </Tab.Navigator>
  );
}
