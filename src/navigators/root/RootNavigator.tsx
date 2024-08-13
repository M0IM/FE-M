import AuthStackNavigator from '../stack/AuthStackNavigator.tsx';
import {useEffect} from 'react';

import SplashScreen from 'react-native-splash-screen';
import useAuth from '../../hooks/queries/AuthScreen/useAuth.ts';
import HomeStackNavigator from 'navigators/stack/HomeStackNavigator.tsx';

export default function RootNavigator() {
  const {isLogin} = useAuth();

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 300);
  }, []);

  return <>{isLogin ? <HomeStackNavigator /> : <AuthStackNavigator />}</>;
}
