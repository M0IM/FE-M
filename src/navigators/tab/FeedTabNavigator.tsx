import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {FeedTabParamList} from '../types';
import HomeScreen from 'screens/FeedTabScreens/FeedHomeScreen.tsx';
import MoimHomeScreen from 'screens/FeedTabScreens/MoimHomeScreen.tsx';
import ChatHomeScreen from 'screens/FeedTabScreens/MyHomeScreen.tsx';
import MyHomeScreen from 'screens/FeedTabScreens/MyHomeScreen.tsx';
import {StyleSheet} from 'react-native';
import {FeedTabRouteProp} from '../types';
import Ionicons from 'react-native-vector-icons/Ionicons';

function FeedTabBarIcons(route: FeedTabRouteProp, focused: boolean) {
  let iconName = '';

  switch (route.name) {
    case 'FEED_HOME': {
      iconName = focused ? 'home' : 'home-outline';
      break;
    }
    case 'MOIM_HOME': {
      iconName = focused ? 'reader' : 'reader-outline';
      break;
    }
    case 'CHAT_HOME': {
      iconName = focused
        ? 'chatbubble-ellipses'
        : 'chatbubble-ellipses-outline';
      break;
    }
    case 'MY_HOME': {
      iconName = focused ? 'person' : 'person-outline';
      break;
    }
  }
  return (
    <Ionicons name={iconName} color={focused ? '#000' : '#808080'} size={25} />
  );
}

const Tab = createBottomTabNavigator<FeedTabParamList>();

export default function FeedTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerTintColor: '#fff',
        tabBarActiveTintColor: '#fff',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopColor: '#808080',
          borderTopWIdth: StyleSheet.hairlineWidth,
        },
        tabBarIcon: ({focused}) => FeedTabBarIcons(route, focused),
      })}>
      <Tab.Screen name={'FEED_HOME'} component={HomeScreen} />
      <Tab.Screen name={'MOIM_HOME'} component={MoimHomeScreen} />
      <Tab.Screen name={'CHAT_HOME'} component={ChatHomeScreen} />
      <Tab.Screen name={'MY_HOME'} component={MyHomeScreen} />
    </Tab.Navigator>
  );
}
