import React from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { MaterialTopTabNavigationEventMap } from '@react-navigation/material-top-tabs';
import { MaterialTopTabDescriptorMap } from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CustomTabBarProps {
  state: TabNavigationState<ParamListBase>;
  descriptors: MaterialTopTabDescriptorMap;
  navigation: NavigationHelpers<
    ParamListBase,
    MaterialTopTabNavigationEventMap
  >;
  position: Animated.AnimatedInterpolation<number>;
}

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
  position,
}: CustomTabBarProps) => {
  const currentRouteName = state.routes[state.index]?.name;

  const shouldHideTabs = () => {
    if (currentRouteName === 'MOIM_BOARD') {
      const hiddenRoutes = ['MOIM_POST_DETAIL', 'MOIM_POST_WRITE', 'MOIM_POST_EDIT'];
      const moimBoardState = state.routes.find(route => route.name === 'MOIM_BOARD')?.state;
      if (moimBoardState) {
        return moimBoardState.routes.some((route: any) => hiddenRoutes.includes(route.name));
      }
    }
    return false;
  };

  const hideTabs = shouldHideTabs();

  return (
    <View className='flex-row items-center justify-start p-2 bg-white'>
      {(currentRouteName !== 'FEED_HOME_FEED') && (currentRouteName !== 'FEED_HOME_CALENDAR') &&       
        <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Ionicons name='chevron-back-sharp' size={25}/>
        </TouchableOpacity>}
      {!hideTabs && state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_: any, i: any) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i: any) => (i === index ? 1 : 0.2)),
        });

        return (
          <TouchableOpacity
          key={index}
          accessibilityRole="button"
          accessibilityState={isFocused ? {selected: true} : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          onLongPress={onLongPress}
          className="flex ml-3 bg-white">
          <Animated.Text
            style={{opacity}}
            className="text-2xl text-dark-800 font-bold">
            {label}
          </Animated.Text>
        </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
