import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppSetupContainer from './src/containers/AppSetupContainer.tsx';
import RootNavigator from './src/navigators/root/RootNavigator.tsx';
import {DevToolsBubble} from 'react-native-react-query-devtools';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Sending']);

import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import {useEffect} from 'react';
import useFcmTokenStore from './src/stores/useFcmTokenStore.ts';

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
});
// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    // 기기마다 고유한 토큰
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
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
PushNotification.createChannel(
  {
    channelId: 'noti',
    channelName: '공지사항용',
    channelDescription: '앱 실행하는 알림',
    soundName: 'default',
    importance: 4,
    vibrate: true,
  },
  (created: boolean) => console.log(`channel 생성, ${created}`),
);

function App() {
  const {setFcmToken} = useFcmTokenStore();
  useEffect(() => {
    async function getToken() {
      try {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }
        const phoneToken = await messaging().getToken();
        setFcmToken(phoneToken);
        console.log(phoneToken, 'hi');
      } catch (e) {
        console.log(e);
      }
    }
    getToken();
  }, []);
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
