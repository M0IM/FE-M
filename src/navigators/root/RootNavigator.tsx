import FeedTabNavigator from '../tab/FeedTabNavigator.tsx';
import AuthStackNavigator from '../stack/AuthStackNavigator.tsx';
import {useEffect} from 'react';

import SplashScreen from 'react-native-splash-screen';
import useAuth from '../../hooks/queries/AuthScreen/useAuth.ts';

export default function RootNavigator() {
  const {isLogin} = useAuth();
  console.log(isLogin);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return <>{isLogin ? <FeedTabNavigator /> : <AuthStackNavigator />}</>;
}
