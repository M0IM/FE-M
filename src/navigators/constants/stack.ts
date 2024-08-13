import {createStackNavigator} from '@react-navigation/stack';
import {
  AuthStackParamList,
  CalendarStackParamList,
  MoimStackParamList,
  MyStackParamList,
  MoimPlanStackParamList,
  MoimPostStackParamList,
  RevokeMoimStackParamList,
  AppInfoStackParamList,
  ChatStackParamList,
} from '../types';

// 1. AuthStack
export const AuthStack = createStackNavigator<AuthStackParamList>();

// 2. CalendarStack
export const CalendarStack = createStackNavigator<CalendarStackParamList>();

// 3. MyStack
export const MyStack = createStackNavigator<MyStackParamList>();

// 4. MoimStack
export const MoimStack = createStackNavigator<MoimStackParamList>();

// 5. MoimPlanStack
export const MoimPlanStack = createStackNavigator<MoimPlanStackParamList>();

// 6. MoimPostStack
export const MoimPostStack = createStackNavigator<MoimPostStackParamList>();

// 7. RevokeMoimStack
export const RevokeMoimStack = createStackNavigator<RevokeMoimStackParamList>();

// 8. AppInfoStack
export const AppInfoStack = createStackNavigator<AppInfoStackParamList>();

// 9. ChatStack
export const ChatStack = createStackNavigator<ChatStackParamList>();
