import {CommonResponse} from '../mutations/common.ts';

type TSignup = {
  provider: 'KAKAO' | 'GOOGLE' | 'NAVER' | 'APPLE' | 'LOCAL';
  providerId?: string;
  nickname: string;
  email: string;
  password?: string;
  role?: 'ROLE_USER' | 'ROLE_ADMIN';
  gender: 'FEMALE' | 'MALE';
  birth: string;
  residence: string;
  fcmToken: string;
};

type TResponseToken = {
  accessToken: string;
  refreshToken: string;
  result?: string;
  provider: 'KAKAO' | 'GOOGLE' | 'APPLE' | 'NAVER' | 'UNREGISTERED';
  email: string;
};

type TResponseSignup = CommonResponse<TResponseToken>;

type TLogin = {
  email: string;
  password: string;
  fcmToken: string;
};

type TSocial = {
  type: 'KAKAO' | 'APPLE' | 'GOOGLE' | 'NAVER';
  idToken: string;
  fcmToken: string;
};

type TLogout = CommonResponse<object>;

type TGetAccessToken = CommonResponse<TResponseToken>;

export type {
  TSignup,
  TResponseToken,
  TResponseSignup,
  TLogin,
  TSocial,
  TLogout,
  TGetAccessToken,
};
