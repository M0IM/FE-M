import {AuthStack} from 'navigators/constants';
import LoginScreen from 'screens/AuthStackScreens/LoginScreen.tsx';
import AuthHomeScreen from 'screens/AuthStackScreens/AuthHomeScreen.tsx';
import SignUpScreen from 'screens/AuthStackScreens/SignUpScreen.tsx';

export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name={'AUTH_HOME'} component={AuthHomeScreen} />
      <AuthStack.Screen name={'LOGIN'} component={LoginScreen} />
      <AuthStack.Screen name={'SIGN_UP'} component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}
