import FeedTabNavigator from '../tab/FeedTabNavigator.tsx';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from '../stack/AuthStackNavigator.tsx';
import {useEffect} from 'react';

import SplashScreen from 'react-native-splash-screen';
import {CustomButton} from '../../components/@common/CustomButton/CustomButton.tsx';
import useAuth from '../../hooks/queries/AuthScreen/useAuth.ts';

export default function RootNavigator() {
  const {isLogin, isLoginLoading} = useAuth();
  console.log(isLogin, isLoginLoading);

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
      {/*<CustomButton label={'HI'} onPress={() => isLogin === false} />*/}
    </NavigationContainer>
  );
}
