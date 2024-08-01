import axios from 'axios';
import Config from 'react-native-config';

import axiosInstance from './axiosInstance.ts';
import {getEncryptStorage, removeEncryptStorage, removeHeader} from 'utils';
import {storageKeys} from '../constants/storageKeys/keys.ts';

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
};

type TResponseToken = {
  accessToken: string;
  refreshToken: string;
  provider: 'KAKAO' | 'GOOGLE' | 'APPLE' | 'NAVER' | 'UNREGISTERED';
};

type TResponseSignup = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: TResponseToken;
};

// 회원가입 API
const postSignup = async ({
  provider,
  providerId,
  nickname,
  email,
  password,
  role,
  gender,
  birth,
  residence,
}: TSignup): Promise<TResponseSignup> => {
  const {data} = await axiosInstance.post('/api/v1/auth/join', {
    provider,
    providerId,
    nickname,
    email,
    password,
    role,
    gender,
    birth,
    residence,
  });

  return data;
};

type TLogin = {
  email: string;
  password: string;
};

// 일반 로그인 API
const postLogin = async ({
  email,
  password,
}: TLogin): Promise<TResponseSignup> => {
  const {data} = await axiosInstance.post('/api/v1/auth/login', {
    email,
    password,
  });
  return data;
};

type TSocial = {
  type: 'KAKAO' | 'APPLE' | 'GOOGLE' | 'NAVER';
  idToken: string;
};

/**
 * @docs 소셜 로그인 API
 * @param type
 * @param idToken
 */
const socialLogin = async ({
  type,
  idToken,
}: TSocial): Promise<TResponseSignup> => {
  const {data} = await axiosInstance.post(`/api/v1/auth/oAuth`, {
    provider: type,
    token: idToken,
  });

  return data;
};

type TLogout = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: object;
};

const logout = async (): Promise<TLogout> => {
  const {data} = await axiosInstance.get('/api/v1/auth/logout');
  await removeEncryptStorage(storageKeys.REFRESH_TOKEN);
  removeHeader('Authorization');

  return data;
};

type TGetAccessToken = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: TResponseToken;
};

const getAccessToken = async (): Promise<TGetAccessToken> => {
  const refreshToken = await getEncryptStorage(storageKeys.REFRESH_TOKEN);
  console.log('함수', refreshToken);

  const {data} = await axios.get(
    `${Config.SERVER_URL}/api/v1/auth/reissueToken`,
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );

  return data;
};

type TUserProfile = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    profileId: number;
    nickname: string;
    profileImageUrl: string;
  };
};

const getUserProfile = async (): Promise<TUserProfile> => {
  // const {data} = await axiosInstance.get('/api/v1/users/profile');
  const {data} = await axios.get(`${Config.SERVER_URL}/api/v1/users/profile`);
  console.log(data);
  return data;
};

export type {TResponseSignup, TResponseToken, TSignup, TLogin, TSocial};
export {
  postSignup,
  postLogin,
  socialLogin,
  logout,
  getAccessToken,
  getUserProfile,
};
