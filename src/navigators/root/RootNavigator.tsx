import FeedTabNavigator from '../tab/FeedTabNavigator.tsx';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from '../stack/AuthStackNavigator.tsx';
import {useEffect} from 'react';

import SplashScreen from 'react-native-splash-screen';

export default function RootNavigator() {
  const isLogin = false;
  const isLoginLoading = false;

  useEffect(() => {
    if (!isLoginLoading) {
      setTimeout(() => {
        SplashScreen.hide();
      }, 1000);
    }
  }, [isLoginLoading]);
  return (
    <NavigationContainer>
      {isLogin ? <FeedTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}
