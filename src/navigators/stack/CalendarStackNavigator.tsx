import {CalendarStack} from '../constants';
import CalendarHomeScreen from 'screens/CalendarStackScreens/CalendarHomeScreen.tsx';
import CalendarDetailScreen from 'screens/CalendarStackScreens/CalendarDetailScreen.tsx';
import CalendarWriteScreen from '../../screens/CalendarStackScreens/CalendarWriteScreen.tsx';

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
        name={'CALENDAR_DETAIL'}
        component={CalendarDetailScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitleVisible: false,
        }}
      />
      <CalendarStack.Screen
        name={'CALENDAR_WRITE'}
        options={{
          presentation: 'transparentModal',
          headerShown: true,
          headerTitle: '',
          headerBackTitleVisible: false,
        }}
        component={CalendarWriteScreen}
      />
    </CalendarStack.Navigator>
  );
}
