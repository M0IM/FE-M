import {Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import MoimCreateScreen from 'screens/MoimCreateScreens/MoimCreateScreen';
import MoimSearchScreen from 'screens/MoimSearchScreens/MoimSearchScreen';
import PushAlertScreen from 'screens/PushAlertScreens/PushAlertScreen';
import CalendarIndividualDetailScreen from 'screens/MoimStackScreens/CalendarIndividualDetailScreen.tsx';
import CalendarParticipantDetailScreen from 'screens/MoimStackScreens/CalendarParticipantDetailScreen.tsx';
import CalendarTodoDetailScreen from 'screens/MoimStackScreens/CalendarTodoDetailScreen.tsx';

import {HomeStack} from 'navigators/constants';
import FeedTabNavigator from 'navigators/tab/FeedTabNavigator';
import MoimTopTabNavigator from 'navigators/tab/MoimTopTabNavigator';
import MoimPostStackNavigator from './MoimPostStackNavigator';
import UserProfileStackNavigator from './UserProfileStackNavigator.tsx';

export default function HomeStackNavigator() {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  const platform = Platform.OS;

  return (
    <HomeStack.Navigator
      initialRouteName={'HOME'}
      screenOptions={{
        cardStyle: {
          backgroundColor: '#fff',
        },
      }}>
      <HomeStack.Screen
        name={'HOME'}
        component={FeedTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={'MOIM_CREATE'}
        component={MoimCreateScreen}
        options={{
          headerTitle: '모임 생성',
          headerTintColor: '#000',
          headerLeftLabelVisible: false,
          headerTitleAlign: 'center',
        }}
      />
      <HomeStack.Screen
        name={'MOIM_SEARCH'}
        component={MoimSearchScreen}
        options={{
          headerTitle: '모임 찾기',
          headerTintColor: '#000',
          headerLeftLabelVisible: false,
          headerTitleAlign: 'center',
        }}
      />
      <HomeStack.Screen
        name={'PUSH_ALERT'}
        component={PushAlertScreen}
        options={{
          headerTitle: '알림',
          headerTintColor: '#000',
          headerLeftLabelVisible: false,
          headerTitleAlign: 'center',
        }}
      />
      <HomeStack.Screen
        name={'MOIM_STACK'}
        component={MoimTopTabNavigator}
        options={{
          headerTitle: '',
          headerLeft: () => <></>,
          headerStyle: {
            shadowOpacity: 0,
            height: platform === 'ios' ? statusBarHeight : statusBarHeight + 10,
            elevation: 0,
          },
        }}
      />
      <HomeStack.Screen
        name={'MOIM_BOARD_STACK'}
        component={MoimPostStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={'CALENDAR_INDIVIDUAL_DETAIL'}
        component={CalendarIndividualDetailScreen}
        options={{
          headerTitle: '나의 일정',
          headerTintColor: '#000',
          headerBackTitleVisible: false,
        }}
      />
      <HomeStack.Screen
        name={'CALENDAR_PARTICIPANT_DETAIL'}
        component={CalendarParticipantDetailScreen}
        options={{
          headerTitle: '모임 일정',
          headerTintColor: '#000',
          headerBackTitleVisible: false,
        }}
      />
      <HomeStack.Screen
        name={'CALENDAR_TODO_DETAIL'}
        component={CalendarTodoDetailScreen}
        options={{
          headerTitle: '내가 할 일',
          headerTintColor: '#000',
          headerBackTitleVisible: false,
        }}
      />
      <HomeStack.Screen
        name={'USER_DETAIL_PROFILE'}
        component={UserProfileStackNavigator}
        options={() => ({
          headerShown: false,
        })}
      />
    </HomeStack.Navigator>
  );
}
