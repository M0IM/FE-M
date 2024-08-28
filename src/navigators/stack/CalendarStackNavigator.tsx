import CalendarHomeScreen from 'screens/CalendarStackScreens/CalendarHomeScreen.tsx';

import CalendarWriteScreen from 'screens/MoimStackScreens/CalendarWriteScreen.tsx';
import CalendarModifyScreen from 'screens/CalendarStackScreens/CalendarModifyScreen.tsx';

import {CalendarStack} from '../constants';

export default function CalendarStackNavigator() {
  return (
    <CalendarStack.Navigator
      initialRouteName={'CALENDAR_HOME'}
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <CalendarStack.Screen
        name={'CALENDAR_HOME'}
        component={CalendarHomeScreen}
      />
      <CalendarStack.Screen
        name={'CALENDAR_MODIFY'}
        component={CalendarModifyScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitleVisible: false,
          headerTintColor: '#000',
        }}
      />
      <CalendarStack.Screen
        name={'CALENDAR_WRITE'}
        component={CalendarWriteScreen}
      />
    </CalendarStack.Navigator>
  );
}
