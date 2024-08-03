import {NavigationProp, RouteProp} from '@react-navigation/native';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import {StackNavigationProp} from '@react-navigation/stack';

/** param list */
export type FeedTabParamList = {
  FEED_HOME: undefined;
  MOIM_HOME: undefined;
  CHAT_HOME: undefined;
  MY_HOME: undefined;
};

export type FeedTopTabParamList = {
  FEED_HOME_FEED: undefined;
  FEED_HOME_CALENDAR: undefined;
};

export type AuthStackParamList = {
  AUTH_HOME: undefined;
  LOGIN: undefined;
  SERVICE_TERM: undefined;
  PRIVACY_POLICY: undefined;
  STEP_1: undefined;
  STEP_2: undefined;
  STEP_3: undefined;
  STEP_4: undefined;
  STEP_5: undefined;
};

export type CalendarStackParamList = {
  CALENDAR_HOME: undefined;
  CALENDAR_DETAIL: {id: number};
};

/** screen name */
export type FeedTabScreenName = keyof FeedTabParamList;
export type FeedTopTabScreenName = keyof FeedTopTabParamList;
export type AuthStackScreenName = keyof AuthStackParamList;
export type CalendarStackScreenName = keyof CalendarStackParamList;

/** route props */
export type FeedTabRouteProp = RouteProp<FeedTabParamList, FeedTabScreenName>;
export type FeedTopTabRouteProp = RouteProp<
  FeedTopTabParamList,
  FeedTopTabScreenName
>;
export type AuthStackRouteProp = RouteProp<
  AuthStackParamList,
  AuthStackScreenName
>;
export type CalendarStackRouteProp = RouteProp<
  CalendarStackParamList,
  CalendarStackScreenName
>;

/** navigation props */
export type FeedTabNavigationProp = NavigationProp<FeedTabParamList>;
export type FeedTopTabNavigationProp =
  MaterialTopTabNavigationProp<FeedTopTabParamList>;
export type AuthStackNavigationProp = NavigationProp<AuthStackParamList>;
export type CalendarStackNavigationProp =
  StackNavigationProp<CalendarStackParamList>;
