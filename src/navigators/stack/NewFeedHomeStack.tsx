import {NewFeedHomeStack} from '../constants';

import NewFeedHomeScreen from 'screens/NewFeedStack/NewFeedHomeScreen.tsx';
import NewFeedDetailScreen from 'screens/NewFeedStack/NewFeedDetailScreen.tsx';

export default function NewFeedStackNavigator() {
  return (
    <NewFeedHomeStack.Navigator
      initialRouteName={'NEW_FEED_MAIN'}
      screenOptions={{
        headerShown: false,
      }}>
      <NewFeedHomeStack.Screen
        name={'NEW_FEED_MAIN'}
        component={NewFeedHomeScreen}
      />
      <NewFeedHomeStack.Screen
        name={'NEW_FEED_DETAIL'}
        component={NewFeedDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </NewFeedHomeStack.Navigator>
  );
}
