import AuthStackNavigator from '../stack/AuthStackNavigator.tsx';
import {useEffect} from 'react';

import SplashScreen from 'react-native-splash-screen';
import useAuth from 'hooks/queries/AuthScreen/useAuth.ts';
import HomeStackNavigator from 'navigators/stack/HomeStackNavigator.tsx';

export default function RootNavigator() {
  const {isLogin, isLoginLoading} = useAuth();

  useEffect(() => {
    if (!isLoginLoading) {
      setTimeout(() => {
        SplashScreen.hide();
      }, 1000);
    }
  }, [isLoginLoading]);

  return <>{isLogin ? <HomeStackNavigator /> : <AuthStackNavigator />}</>;
}
