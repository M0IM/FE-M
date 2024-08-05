import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ChatHomeScreen from '../../screens/ChatStackScreens/ChatHomeScreen.tsx';
import {FeedTabHeaderLogo} from 'components/feedTab/FeedTabHeaderLogo.tsx';
import {FeedTabHeaderRight} from 'components/feedTab/FeedTabHeaderRight.tsx';

import {FeedTabRouteProp} from '../types';
import {FeedTabParamList} from '../types';
import FeedHomeTopTabNavigator from './FeedHomeTopTabNavigator.tsx';
import MyStackNavigator from '../stack/MyStackNavigator.tsx';
import MoimStackNavigator from '../stack/MoimStackNavigator.tsx';
import ChatStackNavigator from '../stack/ChatStackNavigator.tsx';

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
      screenOptions={({route, navigation}) => ({
        headerShown: true,
        headerTitle: '',
        headerLeft: () => FeedTabHeaderLogo(navigation),
        headerRight: () => FeedTabHeaderRight(navigation),
        headerStyle: {
          backgroundColor: '#fff',
          borderBottomColor: '#000',
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTintColor: '#fff',
        tabBarActiveTintColor: '#fff',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopColor: '#808080',
        },
        tabBarIcon: ({focused}) => FeedTabBarIcons(route, focused),
      })}>
      <Tab.Screen name={'FEED_HOME'} component={FeedHomeTopTabNavigator} />
      <Tab.Screen name={'MOIM_HOME'} component={MoimStackNavigator} />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name={'CHAT_HOME'}
        component={ChatStackNavigator}
      />
      <Tab.Screen
        name={'MY_HOME'}
        options={{
          headerShown: false,
        }}
        component={MyStackNavigator}
      />
    </Tab.Navigator>
  );
}
