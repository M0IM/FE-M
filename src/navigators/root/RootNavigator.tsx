import AuthStackNavigator from '../stack/AuthStackNavigator.tsx';
import {useEffect} from 'react';

import SplashScreen from 'react-native-splash-screen';
import useAuth from 'hooks/queries/AuthScreen/useAuth.ts';
import HomeStackNavigator from 'navigators/stack/HomeStackNavigator.tsx';
import useFcmTokenStore from 'stores/useFcmTokenStore.ts';
import messaging from '@react-native-firebase/messaging';

export default function RootNavigator() {
  const {isLogin, isLoginLoading} = useAuth();
  console.log(isLogin, isLoginLoading);
  const {setFcmToken} = useFcmTokenStore();

  useEffect(() => {
    async function getToken() {
      try {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }
        const phoneToken = await messaging().getToken();
        setFcmToken(phoneToken);
      } catch (e) {
        console.log(e);
      }
    }
    getToken();
  }, []);

  useEffect(() => {
    if (!isLoginLoading) {
      setTimeout(() => {
        SplashScreen.hide();
      }, 1000);
    }
  }, [isLoginLoading]);

  return <>{isLogin ? <HomeStackNavigator /> : <AuthStackNavigator />}</>;
}
