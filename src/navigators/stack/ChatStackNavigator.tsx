import {ChatStack} from '../constants';
import ChatHomeScreen from 'screens/ChatStackScreens/ChatHomeScreen.tsx';
import ChatRoomScreen from 'screens/ChatStackScreens/ChatRoomScreen.tsx';

export default function ChatStackNavigator() {
  return (
    <ChatStack.Navigator
      screenOptions={{
        headerShown: true,
        cardStyle: {
          backgroundColor: '#fff',
        },
      }}>
      <ChatStack.Screen
        options={{
          headerShown: false,
        }}
        name={'CHAT_LIST'}
        component={ChatHomeScreen}
      />
      <ChatStack.Screen
        options={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
        }}
        name={'CHAT_ROOM'}
        component={ChatRoomScreen}
      />
    </ChatStack.Navigator>
  );
}
