import axiosInstance from './axiosInstance.ts';
import {getEncryptStorage} from '../utils';
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
  type: 'KAKAO' | 'GOOGLE' | 'APPLE' | 'NAVER' | 'REGISTER';
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
}: TLogin): Promise<TResponseToken> => {
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
}: TSocial): Promise<TResponseToken> => {
  const {data} = await axiosInstance.post(`/api/v1/auth/oAuth`, {
    provider: type,
    idToken,
  });

  return data;
};

const logout = async () => {
  const {data} = await axiosInstance.post('/api/v1/auth/logout', {});

  return data;
};

const getAccessToken = async (): Promise<TResponseToken> => {
  const refreshToken = await getEncryptStorage(storageKeys.REFRESH_TOKEN);

  const {data} = await axiosInstance.get('/api/v1/auth/reissueToken', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

export type {TResponseSignup, TResponseToken, TSignup, TLogin, TSocial};
export {postSignup, postLogin, socialLogin, logout, getAccessToken};
