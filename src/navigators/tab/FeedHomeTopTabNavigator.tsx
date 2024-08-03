import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FeedHomeScreen from '../../screens/FeedTabScreens/FeedHomeScreen.tsx';
import {FeedTopTabParamList} from '../types';
import FeedHomeCalendarScreen from '../../screens/FeedTabScreens/FeedHomeCalendarScreen.tsx';

const Tab = createMaterialTopTabNavigator<FeedTopTabParamList>();

export default function FeedHomeTopTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={'FEED_HOME'}
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 18,
          fontFamily: 'Pretendard-Bold',
        },
        tabBarActiveTintColor: '#000',
        tabBarIndicatorStyle: {
          backgroundColor: '#00F0A1',
        },
      }}>
      <Tab.Screen
        name={'FEED_HOME'}
        component={FeedHomeScreen}
        options={{
          tabBarLabel: '피드',
        }}
      />
      <Tab.Screen
        name={'FEED_HOME_CALENDAR'}
        component={FeedHomeCalendarScreen}
        options={{
          tabBarLabel: '내 일정',
        }}
      />
    </Tab.Navigator>
  );
}
