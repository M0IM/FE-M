import {createStackNavigator} from '@react-navigation/stack';
import {AuthStackParamList} from '../types';

// 1. AuthStack
export const AuthStack = createStackNavigator<AuthStackParamList>();
