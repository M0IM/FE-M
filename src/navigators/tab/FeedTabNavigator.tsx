import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {FeedTabHeaderLogo} from 'components/feedTab/FeedTabHeaderLogo.tsx';
import {FeedTabHeaderRight} from 'components/feedTab/FeedTabHeaderRight.tsx';

import {FeedTabRouteProp, HomeStackNavigationProp} from '../types';
import {FeedTabParamList} from '../types';
import FeedHomeTopTabNavigator from './FeedHomeTopTabNavigator.tsx';
import MyStackNavigator from '../stack/MyStackNavigator.tsx';
import MoimStackNavigator from '../stack/MoimStackNavigator.tsx';
import NewFeedStackNavigator from '../stack/NewFeedHomeStack.tsx';

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
    case 'NEW_FEED_HOME': {
      iconName = focused ? 'newspaper-outline' : 'newspaper-sharp';
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

interface FeedTabNavigatorProps {
  navigation: HomeStackNavigationProp;
}

export default function FeedTabNavigator({
  navigation: homeNavigation,
}: FeedTabNavigatorProps) {
  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => ({
        headerShown: true,
        headerTitle: '',
        headerLeft: () => FeedTabHeaderLogo(navigation),
        headerRight: () => FeedTabHeaderRight(homeNavigation),
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
      <Tab.Screen name={'NEW_FEED_HOME'} component={NewFeedStackNavigator} />
      {/*<Tab.Screen*/}
      {/*  options={{*/}
      {/*    headerShown: false,*/}
      {/*  }}*/}
      {/*  name={'CHAT_HOME'}*/}
      {/*  component={ChatStackNavigator}*/}
      {/*/>*/}
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
