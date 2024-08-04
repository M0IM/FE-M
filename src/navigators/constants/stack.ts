import {createStackNavigator} from '@react-navigation/stack';
import {
  AuthStackParamList,
  CalendarStackParamList,
  MoimStackParamList,
  MyStackParamList,
} from '../types';

// 1. AuthStack
export const AuthStack = createStackNavigator<AuthStackParamList>();

// 2. CalendarStack
export const CalendarStack = createStackNavigator<CalendarStackParamList>();

// 3. MyStack
export const MyStack = createStackNavigator<MyStackParamList>();

// 4. MoimStack
export const MoimStack = createStackNavigator<MoimStackParamList>();
