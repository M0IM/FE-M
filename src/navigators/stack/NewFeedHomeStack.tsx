import {NewFeedHomeStack} from '../constants';

import NewFeedHomeScreen from 'screens/NewFeedStack/NewFeedHomeScreen.tsx';
import NewFeedDetailScreen from 'screens/NewFeedStack/NewFeedDetailScreen.tsx';

export default function NewFeedStackNavigator() {
  return (
    <NewFeedHomeStack.Navigator initialRouteName={'NEW_FEED_MAIN'}>
      <NewFeedHomeStack.Screen
        name={'NEW_FEED_MAIN'}
        component={NewFeedHomeScreen}
        options={{
          headerShown: true,
          headerTitle: '실시간 피드',
        }}
      />
      <NewFeedHomeStack.Screen
        name={'NEW_FEED_DETAIL'}
        component={NewFeedDetailScreen}
        options={{
          presentation: 'transparentModal',
          headerTitle: '',
          headerBackTitleVisible: false,
          headerTintColor: '#000',
        }}
      />
    </NewFeedHomeStack.Navigator>
  );
}
