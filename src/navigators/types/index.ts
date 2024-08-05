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

export type MoimStackParamList = {
  MOIM_LIST: undefined;
  MOIM_DETAIL: {id: number};
};

export type MyStackParamList = {
  // 세팅 페이지
  MY_SETTING_HOME: undefined;
  // 프로필 설정 페이지
  MY_MANAGE_PROFILE: undefined;
  // 문의 하기
  MY_CONTACT: undefined;
  // 내 후기 확인
  MY_REVIEW: undefined;
  // 내 프로필 페이지
  MY_DETAIL_PROFILE: {id: number};
  // 프로필 수정 페이지
  MY_PROFILE_EDIT: {id: number};
  // 모임 탈퇴 신청하기 페이지
  MY_REVOKE_MOIM: undefined;
  // 가입 신청 상태 확인하기 페이지
  MY_MOIM_JOIN_STATUS: undefined;
  // 모임 정보 수정하기
  MY_EDIT_MOIM_INFO: undefined;
  // 알림 설정
  MY_EDIT_ALERT: undefined;
  // 앱 정보
  MY_APP_INFO: undefined;
  // 개인 정보 처리 방침
  MY_PRIVACY_POLICY: undefined;
  // 서비스 이용 약관
  MY_SERVICE_TERM: undefined;
  // 비밀번호 변경
  MY_PASSWORD_CHANGE: undefined;
};

export type ChatStackParamList = {
  CHAT_LIST: undefined;
  CHAT_ROOM: {id: number};
};

/** screen name */
export type FeedTabScreenName = keyof FeedTabParamList;
export type FeedTopTabScreenName = keyof FeedTopTabParamList;
export type AuthStackScreenName = keyof AuthStackParamList;
export type CalendarStackScreenName = keyof CalendarStackParamList;
export type MoimStackScreenName = keyof MoimStackParamList;
export type MyStackScreenName = keyof MyStackParamList;
export type ChatStackScreenName = keyof ChatStackParamList;

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
export type MoimStackRouteProp = RouteProp<
  MoimStackParamList,
  MoimStackScreenName
>;
export type MyStackRouteProp = RouteProp<MyStackParamList, MyStackScreenName>;
export type ChatStackRouteProp = RouteProp<
  ChatStackParamList,
  ChatStackScreenName
>;

/** navigation props */
export type FeedTabNavigationProp = NavigationProp<FeedTabParamList>;
export type FeedTopTabNavigationProp =
  MaterialTopTabNavigationProp<FeedTopTabParamList>;
export type AuthStackNavigationProp = NavigationProp<AuthStackParamList>;
export type CalendarStackNavigationProp =
  StackNavigationProp<CalendarStackParamList>;
export type MoimStackNavigationProp = StackNavigationProp<MoimStackParamList>;
export type MyStackNavigationProp = StackNavigationProp<MyStackParamList>;
export type ChatStackNavigationProp = StackNavigationProp<ChatStackParamList>;
