import {NavigationProp, RouteProp} from '@react-navigation/native';

/** param list */
export type FeedTabParamList = {
  FEED_HOME: undefined;
  MOIM_HOME: undefined;
  CHAT_HOME: undefined;
  MY_HOME: undefined;
};

export type AuthStackParamList = {
  AUTH_HOME: undefined;
  LOGIN: undefined;
  STEP_1: undefined;
  STEP_2: undefined;
  STEP_3: undefined;
  STEP_4: undefined;
  STEP_5: undefined;
};

/** screen name */
export type FeedTabScreenName = keyof FeedTabParamList;
export type AuthStackScreenName = keyof AuthStackParamList;

/** route props */
export type FeedTabRouteProp = RouteProp<FeedTabParamList, FeedTabScreenName>;
export type AuthStackRouteProp = RouteProp<
  AuthStackParamList,
  AuthStackScreenName
>;

/** navigation props */
export type FeedTabNavigationProp = NavigationProp<FeedTabParamList>;
export type AuthStackNavigationProp = NavigationProp<AuthStackParamList>;
