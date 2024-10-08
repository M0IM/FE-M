import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import FeedHomeScreen from 'screens/FeedTabScreens/FeedHomeScreen.tsx';

import {FeedTopTabParamList} from '../types';
import CalendarStackNavigator from '../stack/CalendarStackNavigator.tsx';
import CustomTabBar from 'components/@common/CustomTabBar/CustomTabBar.tsx';

const Tab = createMaterialTopTabNavigator<FeedTopTabParamList>();

export default function FeedHomeTopTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={'FEED_HOME_FEED'}
      tabBar={props => <CustomTabBar {...props} />}
      >
      <Tab.Screen
        name={'FEED_HOME_FEED'}
        component={FeedHomeScreen}
        options={{
          tabBarLabel: '피드',
        }}
      />
      <Tab.Screen
        name={'FEED_HOME_CALENDAR'}
        component={CalendarStackNavigator}
        options={{
          tabBarLabel: '내 일정',
        }}
      />
    </Tab.Navigator>
  );
}
