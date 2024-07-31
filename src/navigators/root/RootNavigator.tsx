import FeedTabNavigator from '../tab/FeedTabNavigator.tsx';
import AuthStackNavigator from '../stack/AuthStackNavigator.tsx';
import {useEffect} from 'react';

import SplashScreen from 'react-native-splash-screen';
import useAuth from '../../hooks/queries/AuthScreen/useAuth.ts';

export default function RootNavigator() {
  const {isLogin, isLoginLoading} = useAuth();

  useEffect(() => {
    if (!isLoginLoading) {
      setTimeout(() => {
        SplashScreen.hide();
      }, 1000);
    }
  }, []);

  console.log(isLogin);

  return <>{isLogin ? <FeedTabNavigator /> : <AuthStackNavigator />}</>;
}
