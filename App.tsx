import {LogBox, Platform} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DevToolsBubble} from 'react-native-react-query-devtools';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';

import AppSetupContainer from './src/containers/AppSetupContainer.tsx';
import RootNavigator from './src/navigators/root/RootNavigator.tsx';

LogBox.ignoreLogs(['Sending']);

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'pink'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
};

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Messaging handled in the background', remoteMessage);
  console.log('underground', remoteMessage);
});

let isNotificationHandled = false; // 플래그 초기화

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    // 기기마다 고유한 토큰
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification: any) {
    if (isNotificationHandled) {
      // 이미 처리된 알림이면 종료
      return;
    }
    console.log(isNotificationHandled, '공지');

    console.log('NOTIFICATION:', notification);

    // iOS에서 foreground 상태이고, 알림이 로컬 알림에서 온 것이 아니라면만 로컬 알림을 생성
    if (
      Platform.OS === 'ios' &&
      notification.foreground &&
      !notification.userInteraction // 로컬 알림으로 인한 상호작용이 아닌 경우
    ) {
      PushNotification.localNotification({
        title: notification.title,
        message: notification.message,
        playSound: true,
        soundName: 'default',
        priority: 'high',
        vibrate: true,
      });
    }

    // 알림 처리 완료 후 플래그 설정
    isNotificationHandled = true;

    // 알림 처리 완료 후 마무리
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

// PushNotification 채널 생성 함수
const createNotificationChannel = (
  channelId: string,
  channelName: string,
  channelDescription: string,
) => {
  PushNotification.createChannel(
    {
      channelId,
      channelName,
      channelDescription,
      importance: Importance.HIGH,
      soundName: 'default',
      vibrate: true,
    },
    (created: boolean) =>
      console.log(`channel ${channelName} 생성, ${created}`),
  );
};

// 여러 채널 생성
const channels = [
  {id: 'TODO', name: '할 일', description: '할 일 알림'},
  {id: 'PLAN', name: '일정', description: '일정 알림'},
  {id: 'COMMENT', name: '댓글', description: '댓글 알림'},
  {id: 'POST', name: '게시글', description: '게시글 알림'},
  {id: 'CHATROOM', name: '채팅', description: '채팅 알림'},
  {id: 'MOIM', name: '모임', description: '모임 알림'},
  {id: 'REVIEW', name: '리뷰', description: '리뷰 알림'},
  {id: 'EVENT', name: '이벤트', description: '이벤트 알림'},
];

// 채널 생성 반복
channels.forEach(channel => {
  createNotificationChannel(channel.id, channel.name, channel.description);
});

function App() {
  return (
    <AppSetupContainer>
      <GestureHandlerRootView>
        <RootNavigator />
        <Toast config={toastConfig} />
        <DevToolsBubble />
      </GestureHandlerRootView>
    </AppSetupContainer>
  );
}

let AppEntryPoint = App;

if (process.env.STORYBOOK_ENABLED) {
  AppEntryPoint = require('./.ondevice').default;
}

if (__DEV__) {
  require('./ReactotronConfig');
}

export default AppEntryPoint;
