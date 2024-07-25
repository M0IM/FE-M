import FeedTabNavigator from '../tab/FeedTabNavigator.tsx';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from '../stack/AuthStackNavigator.tsx';

export default function RootNavigator() {
  const isLogin = false;
  return (
    <NavigationContainer>
      {isLogin ? <FeedTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}
