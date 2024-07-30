import axiosInstance from './axiosInstance.ts';
import {getEncryptStorage} from '../utils';

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
};

type TResponseSignup = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: TResponseToken;
};

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

export type {TResponseSignup, TResponseToken, TSignup, TLogin};
export {postSignup, postLogin};
