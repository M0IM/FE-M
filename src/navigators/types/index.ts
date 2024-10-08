import {NavigationProp, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import {POST_LIST_TYPE} from 'types/dtos/post';

/** param list */
export type HomeStackParamList = {
  HOME: undefined;
  MOIM_CREATE: undefined;
  MOIM_SEARCH: undefined;
  MOIM_STACK: {
    screen: MoimTopTabScreenName;
    params: {
      id: number;
    };
  };
  PUSH_ALERT: undefined;
  MOIM_BOARD_STACK: {
    screen: MoimPostStackScreenName;
    params: {
      id: number;
      postId: number;
    };
  };
  CALENDAR_INDIVIDUAL_DETAIL: {id: number};
  CALENDAR_PARTICIPANT_DETAIL: {id: number};
  CALENDAR_TODO_DETAIL: {id: number; moimId: number};
  USER_DETAIL_PROFILE: {
    screen: UserProfileStackScreenName;
    params: {
      id: number;
      userName: string;
    };
  };
};

export type FeedTabParamList = {
  FEED_HOME: undefined;
  MOIM_HOME: undefined;
  CHAT_HOME: undefined;
  MY_HOME: undefined;
  MOIM_SEARCH: undefined;
  NEW_FEED_HOME: undefined;
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
  CALENDAR_WRITE: undefined;
  CALENDAR_MODIFY: {id: number};
};

export type MoimStackParamList = {
  MOIM_LIST: undefined;
  MOIM_DETAIL: {
    screen: MoimTopTabScreenName;
    params: {
      id: number;
    };
  };
  MOIM_PARTICIPATE: undefined;
  MOIM_WRITE: {id: number | undefined};
};

export type MyStackParamList = {
  // 세팅 페이지
  MY_SETTING_HOME: undefined;
  // 프로필 설정 페이지
  MY_MANAGE_PROFILE: undefined;
  // 문의 하기
  MY_CONTACT: undefined;
  // 내 후기 확인
  MY_REVIEW: {id: number};
  // 내 프로필 페이지
  MY_DETAIL_PROFILE: {id: number};
  // 프로필 수정 페이지
  MY_PROFILE_EDIT: {id: number};
  // 모임 탈퇴 신청하기 페이지
  MY_REVOKE_MOIM: undefined;
  // 가입 신청 상태 확인하기 페이지
  MY_MOIM_JOIN_STATUS: undefined;
  // 모임 정보 수정 리스트
  MY_EDIT_MOIM_INFO: undefined;
  // 모임 정보 수정화면
  MOIM_EDIT_INFO: {id: number};
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
  // 유저 가입 목록 리스트
  MOIM_JOIN_LIST: {id: number};
  // 내가 할당한 할 일 확인
  TODO_ASSIGNMENT_LIST: {
    screen: TodoStackScreenName;
  };
};

export type MoimTopTabParamList = {
  MOIM_SPACE: {id: number};
  MOIM_TOP_PLAN: {id: number};
  MOIM_TOP_BOARD: {id: number};
  MOIM_MANAGEMENT: {id: number};
};

export type MoimPlanStackParamList = {
  MOIM_PLAN_HOME: {id: number};
  MOIM_PLAN_DETAIL: {id: number; planId: number};
  MOIM_PLAN_WRITE: {id: number};
};

export type MoimPostStackParamList = {
  MOIM_BOARD_HOME: {id: number};
  MOIM_POST_DETAIL: {
    id: number;
    postId: number;
  };
  MOIM_POST_WRITE: {
    id: number;
    postType: POST_LIST_TYPE;
  };
  MOIM_POST_EDIT: {
    id: number;
    postId: number;
  };
  MOIM_MEMBER_PROFILE: {
    id: number;
    userName: string;
  };
  MOIM_POST_REVIEW: {
    id: number;
    userName: string;
  };
  MOIM_JOIN_LIST: {
    id: number;
    userName: string;
  };
  MOIM_REVIEW_LIST: {
    id: number;
    userName: string;
  };
};

export type ChatStackParamList = {
  CHAT_LIST: undefined;
  CHAT_ROOM: {id: number};
};

export type RevokeMoimStackParamList = {
  REVOKE_MOIM_LIST: undefined;
  REVOKE_MOIM_DETAIL: {id: number};
};

export type AppInfoStackParamList = {
  APP_INFO_LIST: undefined;
  APP_INFO_DETAIL: {id: number};
};

export type MoimManagementParamList = {
  MOIM_MANAGE_LIST: {id: number};
  PERMISSION_MANAGEMENT: {id: number};
  JOIN_MANAGEMENT: {id: number};
  MOIM_INFO_EDIT: {id: number};
  DELEGATION_AUTHORITY_SCREEN: {id: number};
  MOIM_CREATE_TODO: {id: number};
  MOIM_GET_TODO: {id: number};
  MOIM_DETAIL_TODO: {id: number; moimId: number};
  MOIM_ASSIGNMENT_TODO: {id: number};
  MOIM_ADD_MEMBER: {
    moimId: number;
    todoId: number;
  };
  MOIM_DELETE_MEMBER: {
    moimId: number;
    todoId: number;
  };
  MOIM_OUT_MEMBER: {
    id: number;
  };
};

export type NewFeedHomeStackParamList = {
  NEW_FEED_MAIN: undefined;
  NEW_FEED_DETAIL: {id: number};
};

export type UserProfileStackParamList = {
  USER_PROFILE: {
    id: number;
    userName: string;
  };
  USER_REVIEW: {
    id: number;
    userName: string;
  };
  USER_PARTICIPANT_MOIM: {
    id: number;
    userName: string;
  };
};

export type TodoStackParamList = {
  CREATE_TODO: {id: number};
  DETAIL_TODO: {id: number; moimId: number};
  GET_TODO: undefined;
  ADD_MEMBER_TODO: {id: number; todoId: number};
  DELETE_MEMBER_TODO: {id: number; todoId: number};
};

/** screen name */
export type HomeStackScreenName = keyof HomeStackParamList;
export type FeedTabScreenName = keyof FeedTabParamList;
export type FeedTopTabScreenName = keyof FeedTopTabParamList;
export type AuthStackScreenName = keyof AuthStackParamList;
export type CalendarStackScreenName = keyof CalendarStackParamList;
export type MoimStackScreenName = keyof MoimStackParamList;
export type MyStackScreenName = keyof MyStackParamList;
export type MoimTopTabScreenName = keyof MoimTopTabParamList;
export type MoimPlanStackScreenName = keyof MoimPlanStackParamList;
export type MoimPostStackScreenName = keyof MoimPostStackParamList;
export type RevokeMoimStackScreenName = keyof RevokeMoimStackParamList;
export type AppInfoStackScreenName = keyof AppInfoStackParamList;
export type ChatStackScreenName = keyof ChatStackParamList;
export type MoimManagementScreenName = keyof MoimManagementParamList;
export type NewFeedHomeStackScreenName = keyof NewFeedHomeStackParamList;
export type UserProfileStackScreenName = keyof UserProfileStackParamList;
export type TodoStackScreenName = keyof TodoStackParamList;

/** route props */
export type HomeStackRouteProp = RouteProp<
  HomeStackParamList,
  HomeStackScreenName
>;
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
export type MoimTopTabRouteProp = RouteProp<
  MoimTopTabParamList,
  MoimTopTabScreenName
>;
export type RevokeMoimStackRouteProp = RouteProp<
  RevokeMoimStackParamList,
  RevokeMoimStackScreenName
>;
export type AppInfoStackRouteProp = RouteProp<
  AppInfoStackParamList,
  AppInfoStackScreenName
>;
export type MoimPlanStackRouteProp = RouteProp<
  MoimPlanStackParamList,
  MoimPlanStackScreenName
>;
export type MoimPostStackRouteProp = RouteProp<
  MoimPostStackParamList,
  MoimPostStackScreenName
>;
export type ChatStackRouteProp = RouteProp<
  ChatStackParamList,
  ChatStackScreenName
>;
export type MoimManagementRouteProp = RouteProp<
  MoimManagementParamList,
  MoimManagementScreenName
>;
export type NewFeedHomeRouteProp = RouteProp<
  NewFeedHomeStackParamList,
  NewFeedHomeStackScreenName
>;
export type UserProfileStackRouteProp = RouteProp<
  UserProfileStackParamList,
  UserProfileStackScreenName
>;
export type TodoStackRouteProp = RouteProp<
  TodoStackParamList,
  TodoStackScreenName
>;

/** navigation props */
export type HomeStackNavigationProp = NavigationProp<HomeStackParamList>;
export type FeedTabNavigationProp = NavigationProp<FeedTabParamList>;
export type FeedTopTabNavigationProp =
  MaterialTopTabNavigationProp<FeedTopTabParamList>;
export type AuthStackNavigationProp = NavigationProp<AuthStackParamList>;
export type CalendarStackNavigationProp =
  StackNavigationProp<CalendarStackParamList>;
export type MoimStackNavigationProp = StackNavigationProp<MoimStackParamList>;
export type MyStackNavigationProp = StackNavigationProp<MyStackParamList>;
export type MoimTopTabNavigationProp =
  MaterialTopTabNavigationProp<MoimTopTabParamList>;

export type RevokeMoimStackNavigatorProp =
  StackNavigationProp<RevokeMoimStackParamList>;
export type AppInfoStackNavigatorProp =
  StackNavigationProp<AppInfoStackParamList>;
export type MoimPlanStackNavigationProp =
  StackNavigationProp<MoimPlanStackParamList>;
export type MoimPostStackNavigationProp =
  StackNavigationProp<MoimPostStackParamList>;
export type ChatStackNavigationProp = StackNavigationProp<ChatStackParamList>;
export type MoimManagementNavigationProp =
  StackNavigationProp<MoimManagementParamList>;
export type NewFeedHomeNavigationProp =
  StackNavigationProp<NewFeedHomeStackParamList>;
export type UserProfileStackNavigationProp =
  StackNavigationProp<UserProfileStackParamList>;
export type TodoStackNavigationProp = StackNavigationProp<TodoStackParamList>;
