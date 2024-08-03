import {CalendarStack} from '../constants';
import CalendarHomeScreen from 'screens/CalendarStackScreens/CalendarHomeScreen.tsx';
import CalendarDetailScreen from 'screens/CalendarStackScreens/CalendarDetailScreen.tsx';
import {TransitionPresets} from '@react-navigation/stack';

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
          headerBackTitle: '',
        }}
      />
    </CalendarStack.Navigator>
  );
}